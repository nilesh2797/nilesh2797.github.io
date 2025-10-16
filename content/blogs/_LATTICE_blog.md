# LATTICE: turning LLMs into search agents — a technical deep dive

*By [Your Name]*

**TL;DR:** LATTICE reframes retrieval as an LLM-driven navigation problem over a pre-built semantic tree. It builds a hierarchical index (bottom-up or top-down, using LLMs for summarization and clustering) and at query time uses an LLM as an *active search agent* to score small slates of sibling nodes. Noisy, slate-dependent LLM scores are calibrated into slate-independent latent relevance estimates; these are aggregated into a smoothed *path relevance* that guides a greedy best-first traversal. The approach yields strong zero-shot performance on the reasoning-heavy BRIGHT benchmark and scales more gracefully (in LLM token cost) than flat reranking baselines.

---

## 1 — Motivation: why hierarchical, why LLM?

Modern retrieval faces two forces pulling in opposite directions. On one side, dense retrievers and BM25 provide efficient, scalable candidate generation but are bottlenecked with theire representational capacity[^1], failing on complex and lenghty queries where surface similarity isn't enough. On the other side, using LLMs directly (either as parametric stores or via long-context approaches) brings reasoning power but is either brittle to updates or computationally infeasible at corpus scale.

LATTICE proposes a middle ground: impose a **semantic tree** over the corpus so that a reasoning-capable LLM can be used to *navigate* the index rather than exhaustively rerank a long flat candidate list or attempt to ingest the whole corpus into context. This replaces the retriever+reranker cascade with a single LLM-based search agent operating on a structured, logarithmically searchable scaffold.

Two problems must be solved to make this practical:

1. **How to construct a semantic tree** over arbitrary corpora that preserves useful abstractions.  
2. **How to make LLM local judgments coherent** across different slates and branches, since LLM scores are context-dependent and noisy.

LATTICE designs solutions to both: LLM-driven bottom-up or top-down tree construction, and a calibration + path relevance mechanism that turns local LLM scores into globally coherent signals for traversal.

---

## 2 — High-level approach

The framework has two stages:

- **Offline:** convert the corpus \(D\) into a tree \(T=(V,E)\) with leaf nodes \(V_L\) = documents and internal nodes \(V_I\) = LLM-generated summaries. Construction uses either bottom-up agglomeration (embed → cluster → summarize) or top-down divisive clustering guided by multi-level LLM summaries

- **Online:** given a query \(q\), a *search LLM* \(L\) repeatedly scores small *slates* of candidate nodes (children of a node augmented with cross-branch anchors). Local slate scores are recorded, and a lightweight MLE (linear calibration) estimates slate-independent latent scores \(\hat{s}_v\). Path relevance is defined recursively and smoothed with momentum to guide a best-first beam traversal.

This combination yields a retrieval process that (a) requires far fewer LLM evaluations than flat reranking for large corpora, and (b) enables the LLM to exercise contextual, chain-of-thought reasoning at each decision point. Empirically this produces strong zero-shot results on BRIGHT.

---

## 3 — Offline: building the semantic tree

LATTICE provides two complementary construction strategies. Choose one according to corpus structure.

### 3.1 Bottom-up (agglomerative + summarization)

1. Represent documents (or passages) with embeddings (the authors use Gecko).  
2. Cluster embeddings to form initial parent nodes (optionally leverage metadata for coarse grouping).  
3. For each parent cluster, generate an LLM summary \(\phi(v)\).  
4. Repeat: embed node summaries → cluster → summarize, until the top level has \(\le M\) nodes and a root is created.  

This procedure leverages part-of-document structure (e.g., StackExchange passages) and tends to excel when documents are naturally sub-components of larger sources.

### 3.2 Top-down (divisive LLM clustering with multi-level summaries)

1. Generate multi-level summaries for each leaf (5 levels used in the paper; from broad to detailed).  
2. Start at the root with all leaves as children. Select an appropriate summary granularity for the current node's descendants.  
3. Present the unique summaries to an LLM and ask it to partition them into \(M\) conceptual clusters, returning cluster descriptions and a mapping.  
4. Create internal nodes with those descriptions and reassign descendants; recurse until branching constraints are satisfied.

This approach is preferable when documents are conceptually distinct and high-level semantic splits are more meaningful than local embedding geometry

**Practical note:** tree construction is LLM-heavy; a pragmatic hybrid strategy (traditional clustering at lower levels, LLM summarization at top levels) can reduce cost without sacrificing semantic structure.

---

## 4 — Online: LLM-guided traversal (the core algorithm)

At query time we treat the search LLM \(L\) as a **listwise scorer**:

\[
L(q, [\phi(v_1),\dots,\phi(v_k)]) \rightarrow [s_1,\dots,s_k],\quad s_i\in[0,1].
\]

But raw \(s_i\) are slate-dependent and noisy. LATTICE addresses this with two mechanisms: **slate construction with cross-branch anchors**, and **latent score calibration**.

### 4.1 Slate construction & augmentation

When expanding a node \(v\) we build a slate consisting of its children \(C(v)\) plus an augmentation set \(\text{Aug}(v)\):

- If children are internal nodes, include the best sibling (to enable cross-branch contrast).  
- If children are leaves, augment with \(\ell\) high-scoring leaf candidates sampled from the current prediction set \(\text{Pred}\), with sampling proportional to \(e^{\hat{p}_{\text{rel}}(u)}\).  

Empirically including \(\ell\) cross-branch leaves is critical — it anchors leaf scores to good candidates found elsewhere. Ablation shows large drops when \(\ell=0\).

### 4.2 Calibration model (latent relevance)

Model the observed slate score \(s_{i,v}\) of node \(v\) in slate \(i\) as:

\[
s_{i,v} \approx a \cdot \hat{s}_v + b_i,
\]

where \(a\) is a global scale, \(b_i\) is a per-slate bias, and \(\hat{s}_v\) is a slate-independent latent relevance for node \(v\). Collect scores across slates and solve a simple MLE (minimize MSE) to estimate \(\{\hat{s}_v\}, a, \{b_i\}\). This linear correction accounts for contextual biases introduced by slate composition and reduces inconsistency across branches.

### 4.3 Path relevance and search update

Define the **path relevance** \(\hat{p}_{\text{rel}}(v)\) recursively:

\[
\hat{p}_{\text{rel}}(v) = \alpha \cdot \hat{p}_{\text{rel}}(\text{parent}(v)) + (1-\alpha) \cdot \hat{s}_v,
\]

with \(\hat{p}_{\text{rel}}(\text{root})=1\). The momentum parameter \(\alpha\in[0,1]\) smooths contributions along the path — experimentally \(\alpha=0.5\) works well. Nodes are pushed into a priority frontier ordered by \(\hat{p}_{\text{rel}}\), and the algorithm repeatedly expands a beam of the top \(B\) nodes for \(N\) iterations. Leaf nodes are collected into \(\text{Pred}\) and ultimately returned by ranking on \(\hat{p}_{\text{rel}}\).

### 4.4 Algorithm (pseudocode)

```text
Input: query q, tree T, search LLM L, beam B, iterations N, momentum α
F ← max-priority queue, Pred ← ∅, ScoreHistory ← ∅
p_rel(root) ← 1.0; F.push(root, 1.0)

for iter = 1..N:
  Beam ← F.pop_top(B)
  for v in Beam:
    Slate ← C(v) + Aug(v)
    LocalScores ← L(q, [φ(u) for u in Slate])
    append (slate_id, u, score) for all u in Slate to ScoreHistory
  {ĥat{s}_v, a, {b_i}} ← Solve MLE on ScoreHistory
  for v in Beam:
    for child u in C(v):
      p_rel(u) ← α * p_rel(v) + (1-α) * ĥat{s}_u
      if u is internal: F.push(u, p_rel(u))
      else: add u to Pred
return top-K from Pred sorted by p_rel
```

This greedy, best-first strategy balances exploration (beam) and exploitation (priority queue) with global coherence through calibration.

---

## 5 — Implementation details that matter

- **LLM choices:** The paper uses Gemini-2.5-flash for both construction and search; embeddings are Gecko. Hyperparameters in the experiments: \(N=20\), \(B=2\), \(\ell=10\), \(\alpha=0.5\). These choices lead to roughly 250 LLM-evaluated documents per query under their setup.  
- **Calibration solver:** MSE objective minimized with Adam (learning rate \(10^{-2}\), 100 steps) — lightweight and incremental after every batch of slate evaluations.  
- **Tree branching:** Max branching factor \(M\) is tuned between 10–20; lower branching increases tree depth (more sequential LLM steps) while higher branching increases per-step slate size (more LLM tokens). Balance depends on your LLM latency/cost profile.

---

## 6 — Results (BRIGHT) and empirical takeaways

On the BRIGHT benchmark (12 reasoning-intensive subsets), LATTICE achieves strong zero-shot performance:

- Average nDCG@10 ≈ **51.6** on StackExchange subsets.
- Average Recall@100 ≈ **74.8%**, improving ~9 percentage points over BM25 in aggregate.  
- Cost-performance tradeoff: LATTICE scales more favorably with token budget than reranking a large flat list — after a modest initial cost (traversing tree depth) additional LLM tokens continue to improve ranking quality, while reranking plateaus earlier.

**Ablations & insights:**

- Cross-branch leaf augmentation (\(\ell>0\)) is essential — removing it severely degrades performance.  
- Removing calibration or path smoothing (α=0) reduces nDCG meaningfully; both components contribute complementary stabilizing effects.  
- Bottom-up vs top-down: align tree construction strategy with corpus structure. Bottom-up helps when passages are subparts of source documents (e.g., biology StackExchange); top-down helps when documents are distinct and conceptual.

---

## 7 — Limitations and practical considerations

- **Static tree assumption:** The semantic tree is static. For dynamic, query-dependent corpora (some BRIGHT subsets), precomputed summaries of internal nodes can mislead traversal when many leaves are filtered per query. Efficient local updates or hybrid dynamic summarization are open problems.

- **Offline cost:** Constructing the tree requires many LLM calls (summaries, top-level clustering), which is a one-time but non-trivial cost. Hybrid construction strategies can mitigate this.

- **Calibration model simplicity:** The linear scale + bias model is effective but simple — richer probabilistic models or learned calibration could further improve robustness, especially across heterogeneous slates.

- **Latency vs parallelism tradeoffs:** Small beams (B=1–2) and deeper search favor higher final ranking quality but are more sequential. Choose beam & iteration schedule to match deployment latency constraints. Empirical budget-matched studies show prioritizing depth is beneficial.

---

## 8 — Practical recipe to try LATTICE on your corpus

1. **Start small.** Build a proof-of-concept tree on a 10k-document subset using bottom-up clustering and LLM summaries.  
2. **Tune branching \(M\)** to control depth vs per-step slate sizes given your LLM token/latency budget.  
3. **Measure anchoring impact.** Try \(\ell\) = {0,1,5,10}; expect large gains up to ~5 and diminishing returns thereafter.  
4. **Track calibration dynamics.** Monitor how many slate evaluations are needed for stable latent scores; increase slate diversity if estimates oscillate.  
5. **Hybridize construction.** Use cheap embeddings + clustering for lower levels; reserve LLM summarization for upper ranks.

---

## 9 — Why this matters (big picture)

LATTICE demonstrates a compelling paradigm: **make the LLM the search agent, not just the reranker**. By scaffolding the LLM's reasoning with a semantic tree and proposing a solution for noisy and context-dependent scoring via calibration and path smoothing, the approach achieves both computational tractability and stronger reasoning-aware retrieval. This opens a path toward retrieval systems where LLMs are more deeply integrated into the search algorithm (not just used at the end), enabling better handling of complex queries that demand multi-step inference.

---

## References & resources

