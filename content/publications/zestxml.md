---
author: ["*Nilesh Gupta*", "Sakina Bohra", "Yashoteja Prabhu", "Saurabh Purohit", "Manik Varma"]
title: "Generalized Zero-shot Extreme Multi-label Classification"
date: "2021-05-19"
venue: "KDD 2021"
description: ""
summary: "This paper proposes Generalized Zero-shot XML (GZXML), a paradigm where the task is to tag a data point with the most relevant labels from a large universe of both seen and unseen labels."
tags: ["information-retrieval", "Encoder", "extreme-classification", "KDD"]
categories: ["Publications"]
series: ["Publications"]
links:
  - text: "Paper"
    url: "http://manikvarma.org/pubs/gupta21.pdf"
  - text: "Code"
    url: "https://github.com/nilesh2797/zestxml"
  - text: "Bibtex"
    url: "/publications/zestxml/#cite"
ShowToc: true
TocOpen: false
draft: false
---

### About
Dual-encoder (DE) models are widely used in retrieval tasks, most commonly studied on open QA benchmarks that are often characterized by multi-class and limited training data. In contrast, their performance in multi-label and data-rich retrieval settings like extreme multi-label classification (XMC), remains under-explored. Current empirical evidence indicates that DE models fall significantly short on XMC benchmarks, where SOTA methods (Dahiya et al., 2023a;b) linearly scale the number of learnable parameters with the total number of classes (documents in the corpus) by employing per-class classification head. To this end, we first study and highlight that existing multi-label contrastive training losses are not appropriate for training DE models on XMC tasks. We propose decoupled softmax loss – a simple modification to the InfoNCE loss – that overcomes the limitations of existing contrastive losses. We further extend our loss design to a soft top-k operator-based loss which is tailored to optimize top-k prediction performance. When trained with our proposed loss functions, standard DE models alone can match or outperform SOTA methods by up to 2% at Precision@1 even on the largest XMC datasets while being 20× smaller in terms of the number of trainable parameters. This leads to more parameter-efficient and universally applicable solutions for retrieval tasks.

### Cite
```bib
@InProceedings{Gupta21,
  author    = "Gupta, N. and Bohra, S. and Prabhu, Y. and Purohit, S. and Varma, M.",
  title     = "Generalized Zero-Shot Extreme Multi-label Learning",
  booktitle = "Proceedings of the ACM SIGKDD Conference on Knowledge Discovery and Data Mining",
  month     = "August",
  year      = "2021"
}
```