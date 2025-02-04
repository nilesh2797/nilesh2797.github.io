---
author: ["++Nilesh Gupta++", "Patrick H. Chen", "Hsiang-Fu Yu", "Cho-Jui Hsieh", "Inderjit S. Dhillon"]
title: "ELIAS: End-to-end Learning to Search and Index in Large Output Spaces"
date: "2022-12-01"
venue: "NeurIPS 2022"
description: ""
summary: "Learnable graph-based search index for classification/retrieval in large output space, scalable to label space on a single A100 GPU, achieves SOTA on multiple large-scale extreme classification benchmarks"
tags: ["information-retrieval", "Encoder", "extreme-classification", "NeurIPS"]
links:
  - text: "Paper"
    url: "https://arxiv.org/abs/2210.08410"
  - text: "Code"
    url: "https://github.com/nilesh2797/ELIAS"
  - text: "Bibtex"
    url: "/publications/elias/#cite"
  - text: "OpenReview"
    url: "https://openreview.net/forum?id=RF5Lb6NaZp"
categories: ["Publications"]
series: ["Publications"]
ShowToc: true
TocOpen: false
draft: false
---

### About
Extreme multi-label classification (XMC) is a popular framework for solving many real-world problems that require accurate prediction from a very large number of potential output choices. A popular approach for dealing with the large label space is to arrange the labels into a shallow tree-based index and then learn an ML model to efficiently search this index via beam search. Existing methods initialize the tree index by clustering the label space into a few mutually exclusive clusters based on pre-defined features and keep it fixed throughout the training procedure. This approach results in a sub-optimal indexing structure over the label space and limits the search performance to the quality of choices made during the initialization of the index. In this paper, we propose a novel method ELIAS which relaxes the tree-based index to a specialized weighted graph-based index which is learned end-to-end with the final task objective. More specifically, ELIAS models the discrete cluster-to-label assignments in the existing tree-based index as soft learnable parameters that are learned jointly with the rest of the ML model. ELIAS achieves state-of-the-art performance on several large-scale extreme classification benchmarks with millions of labels. In particular, ELIAS can be up to 2.5% better at precision@1 and up to 4% better at recall@100 than existing XMC methods. A PyTorch implementation of ELIAS along with other resources is available [here](https://github.com/nilesh2797/ELIAS).

### Cite
```bib
@misc{gupta2023eliasendtoendlearningindex,
      title={ELIAS: End-to-End Learning to Index and Search in Large Output Spaces}, 
      author={Nilesh Gupta and Patrick H. Chen and Hsiang-Fu Yu and Cho-Jui Hsieh and Inderjit S Dhillon},
      year={2023},
      eprint={2210.08410},
      archivePrefix={arXiv},
      primaryClass={cs.LG},
      url={https://arxiv.org/abs/2210.08410}, 
}
```