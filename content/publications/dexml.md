---
author: ["*Nilesh Gupta*", "Devvrit Khatri", "Srinadh Bhojanapalli", "Ankit S. Rawat", "Prateek Jain", "Inderjit S. Dhillon"]
title: "Dual-encoders for Extreme Multi-label Classification"
date: "2024-05-19"
venue: "ICLR 2024"
description: ""
summary: "A parameter efficient encoder only model for multi-shot retrieval (aka extreme classification)"
tags: ["information-retrieval", "Encoder", "extreme-classification", "ICLR"]
categories: ["Publications"]
series: ["Publications"]
ShowToc: true
TocOpen: false
draft: false
---

[Paper](https://arxiv.org/abs/2310.10636v2) | [Code](https://github.com/nilesh2797/dexml)

### About
Dual-encoder (DE) models are widely used in retrieval tasks, most commonly studied on open QA benchmarks that are often characterized by multi-class and limited training data. In contrast, their performance in multi-label and data-rich retrieval settings like extreme multi-label classification (XMC), remains under-explored. Current empirical evidence indicates that DE models fall significantly short on XMC benchmarks, where SOTA methods (Dahiya et al., 2023a;b) linearly scale the number of learnable parameters with the total number of classes (documents in the corpus) by employing per-class classification head. To this end, we first study and highlight that existing multi-label contrastive training losses are not appropriate for training DE models on XMC tasks. We propose decoupled softmax loss – a simple modification to the InfoNCE loss – that overcomes the limitations of existing contrastive losses. We further extend our loss design to a soft top-k operator-based loss which is tailored to optimize top-k prediction performance. When trained with our proposed loss functions, standard DE models alone can match or outperform SOTA methods by up to 2% at Precision@1 even on the largest XMC datasets while being 20× smaller in terms of the number of trainable parameters. This leads to more parameter-efficient and universally applicable solutions for retrieval tasks."

### Cite
```bib
@misc{gupta2024dualencodersextrememultilabelclassification,
      title={Dual-Encoders for Extreme Multi-Label Classification}, 
      author={Nilesh Gupta and Devvrit Khatri and Ankit S Rawat and Srinadh Bhojanapalli and Prateek Jain and Inderjit Dhillon},
      year={2024},
      eprint={2310.10636},
      archivePrefix={arXiv},
      primaryClass={cs.LG},
      url={https://arxiv.org/abs/2310.10636}, 
}
```