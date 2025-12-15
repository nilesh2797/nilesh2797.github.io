---
author: ["Ramnath Kumar", "Anshul Mittal", "<u>Nilesh Gupta</u>", "Aditya Kusupati", "Inderjit S. Dhillon", "Prateek Jain"]
title: "EHI: End-to-end Learning of Hierarchical Index for Efficient Dense Retrieval"
date: "2024-08-01"
venue: "TMLR 2024"
description: "End-to-End Hierarchical Indexing (EHI) improves dense retrieval by jointly learning embeddings and ANN structure, outperforming traditional two-stage methods through integrated optimization and path-aware tree indexing."
summary: ""
links:
  - text: "Paper"
    url: "https://arxiv.org/pdf/2310.08891"
  - text: "Bibtex"
    url: "/publications/ehi/#cite"
  - text: OpenReview
    url: "https://openreview.net/forum?id=GeLLOGsHV9"
tags: ["information-retrieval", "Encoder", "TMLR"]
categories: ["Publications"]
series: ["Publications"]
ShowToc: true
TocOpen: false
draft: false
---

### About
Dense embedding-based retrieval is widely used for semantic search and ranking. However, conventional two-stage approaches, involving contrastive embedding learning followed by approximate nearest neighbor search (ANNS), can suffer from misalignment between these stages. This mismatch degrades retrieval performance. We propose End-to-end Hierarchical Indexing (EHI), a novel method that directly addresses this issue by jointly optimizing embedding generation and ANNS structure. EHI leverages a dual encoder for embedding queries and documents while simultaneously learning an inverted file index (IVF)-style tree structure. To facilitate the effective learning of this discrete structure, EHI introduces dense path embeddings that encodes the path traversed by queries and documents within the tree. Extensive evaluations on standard benchmarks, including MS MARCO (Dev set) and TREC DL19, demonstrate EHI’s superiority over traditional ANNS index. Under the same computational constraints, EHI outperforms existing state-of-the-art methods by +1.45% in MRR@10 on MS MARCO (Dev) and +8.2% in nDCG@10 on TREC DL19, highlighting the benefits of our end-to-end approach.

### Cite
```bib
@misc{kumar2024ehiendtoendlearninghierarchical,
      title={EHI: End-to-end Learning of Hierarchical Index for Efficient Dense Retrieval}, 
      author={Ramnath Kumar and Anshul Mittal and Nilesh Gupta and Aditya Kusupati and Inderjit Dhillon and Prateek Jain},
      year={2024},
      eprint={2310.08891},
      archivePrefix={arXiv},
      primaryClass={cs.LG},
      url={https://arxiv.org/abs/2310.08891}, 
}
```
