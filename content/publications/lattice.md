---
author: ["<u>Nilesh Gupta</u>", "Wei-Cheng Chang", "Ngot Bui", "Cho-Jui Hsieh", "Inderjit S. Dhillon"]
title: "LLM-guided Hierarchical Retrieval"
date: "2025-10-16"
venue: "Arxiv"
description: ""
summary: "*LATTICE turns retrieval into an LLM-driven navigation problem over a semantic scaffold for computational tractability needed for large corpora.*"
links:
  - text: "Paper"
    url: "https://arxiv.org/abs/2510.13217"
  - text: "Code"
    url: "https://github.com/nilesh2797/lattice"
  - text: "Bibtex"
    url: "/publications/lattice/#-cite"
tags: ["information-retrieval", "llm"]
categories: ["Publications"]
series: ["Publications"]
ShowToc: true
TocOpen: false
draft: false
---

## Overview

<p align="center">
  <img src="/media/lattice-overview.png" width="800">
</p>

LATTICE proposes an *LLM-native retrieval* paradigm that combines the efficiency of hierarchical search with the reasoning power of modern large language models. Instead of relying on a static retriever + reranker pipeline or attempting to place a large corpus directly in an LLM context, LATTICE organizes the corpus into a semantic tree and uses an LLM as an *active search agent* that navigates that tree. This design yields logarithmic search complexity while preserving the LLM’s ability to perform nuanced, multi-step relevance judgments for complex, reasoning-heavy queries.

## Interactive sample prediction

<!-- {{< plotly src="/plots/visualize_sample_bio0.html" height="1020px" maxwidth="1400px" >}} -->
<iframe src="/plots/visualize_sample_bio0.html" width="800" height="600px" frameborder="0"></iframe>

Interactive Plotly view of a LATTICE search over a semantic tree: the tree root is at the top and document leaves are at the bottom.  
- **Yellow path** = ground-truth route to the relevant document(s).  
- **Green intensity** = node path relevance (darker = higher relevance).  
- **Hover callouts** show the LLM’s local score, calibrated latent score, child scores, and the model’s reasoning (chain-of-thought) used when expanding that node.  

Use the visualization to quickly see which branches the agent prioritized, inspect calibration effects (local vs. calibrated scores), and read the LLM’s justification for traversal decisions.

### Key ideas
- **Semantic tree index:**
  - The corpus is structured offline into a hierarchy of internal nodes (LLM-generated summaries) and leaf nodes (documents). This tree constrains the search space and makes traversal efficient.
- **LLM-guided traversal:**
  - At query time, a search LLM reasons and scores small candidate slates of sibling nodes along with some calibration nodes. These local judgments drive a best-first traversal (beam expansion) instead of flat reranking.
- **Global calibration:**
  - LLM scores are context-dependent and noisy, LATTICE tries to estimate *latent* relevance scores and aggregates it into a *path relevance* score (smoothed via a momentum α) so nodes across branches are comparable.
- **Two tree construction strategies:**
  - (1) **Bottom-up** — agglomerative clustering and LLM summarization (good when passages belong to larger source documents);
  - (2) **Top-down** — LLM-driven divisive clustering using multi-level summaries (better when documents are conceptually distinct).

### Why it matters
- **Efficiency** → Traversing a semantic tree can require fewer LLM evaluations than reranking long flat lists; search cost grows roughly logarithmically with corpus size.
- **Reasoning-aware retrieval** → The search LLM's in-context reasoning allows retrieval to capture deeper, multi-step relevance signals that simple embeddings or keyword matchers miss.
- **Strong zero-shot results** → In experiments on BRIGHT, LATTICE substantially improves retrieval recall and ranking quality in zero-shot settings.

## Results
### Ranking results on BRIGHT
<p align="center">
  <img src="/media/lattice-bright-ndcg.png" width="800">
</p>

### Retrieval results & cost analysis on Stackexchange datasets from BRIGHT
<p align="center">
  <img src="/media/lattice-retrieval-plots.png" width="800">
</p>


## 📜 Cite

If you find this work helpful, please cite:

```bibtex
@article{gupta2025lattice,
  title={LLM-Guided Hierarchical Retrieval},
  author={Gupta, Nilesh and Chang, Wei-Cheng and Bui, Ngot and Hsieh, Cho-Jui and Dhillon, Inderjit S.},
  journal={arXiv preprint arXiv:2510.13217},
  year={2025}
}
```