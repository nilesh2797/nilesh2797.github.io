---
author: ["Kunal Dahiya*", "*Nilesh Gupta**", Deepak Saini*, Akshay Soni, Yajun Wang, Kushal Dave, Jian Jiao, Gururaj K, Prasenjit Dey, Amit Singh, Deepesh Hada, Vidit Jain, Bhawna Paliwal, Anshul Mittal, Sonu Mehta, Ramachandran Ramjee, Sumeet Agarwal, Purushottam Kar, Manik Varma]
title: "NGAME: Negative Mining aware Mini-batching for Extreme Classification"
date: "2023-08-01"
venue: "WSDM 2023"
summary: "A light-weight mini-batch creation technique that offers provably accurate in-batch negative samples for training retrieval models. This allows training with larger mini-batches offering significantly faster convergence and higher accuracies than existing negative sampling techniques."
description: ""
tags: ["Information-Retrieval", "Encoder", "Extreme-Classification", "WSDM"]
categories: ["Publications"]
series: ["Publications"]
ShowToc: true
TocOpen: false
draft: false
---

[Paper](https://arxiv.org/abs/2207.04452) | [Code](https://github.com/Extreme-classification/ngame)

### About
Dual-encoder (DE) models are widely used in retrieval tasks, most commonly studied on open QA benchmarks that are often characterized by multi-class and limited training data. In contrast, their performance in multi-label and data-rich retrieval settings like extreme multi-label classification (XMC), remains under-explored. Current empirical evidence indicates that DE models fall significantly short on XMC benchmarks, where SOTA methods (Dahiya et al., 2023a;b) linearly scale the number of learnable parameters with the total number of classes (documents in the corpus) by employing per-class classification head. To this end, we first study and highlight that existing multi-label contrastive training losses are not appropriate for training DE models on XMC tasks. We propose decoupled softmax loss – a simple modification to the InfoNCE loss – that overcomes the limitations of existing contrastive losses. We further extend our loss design to a soft top-k operator-based loss which is tailored to optimize top-k prediction performance. When trained with our proposed loss functions, standard DE models alone can match or outperform SOTA methods by up to 2% at Precision@1 even on the largest XMC datasets while being 20× smaller in terms of the number of trainable parameters. This leads to more parameter-efficient and universally applicable solutions for retrieval tasks.

### Cite
```bib
@misc{dahiya2022ngamenegativeminingawareminibatching,
      title={NGAME: Negative Mining-aware Mini-batching for Extreme Classification}, 
      author={Kunal Dahiya and Nilesh Gupta and Deepak Saini and Akshay Soni and Yajun Wang and Kushal Dave and Jian Jiao and Gururaj K and Prasenjit Dey and Amit Singh and Deepesh Hada and Vidit Jain and Bhawna Paliwal and Anshul Mittal and Sonu Mehta and Ramachandran Ramjee and Sumeet Agarwal and Purushottam Kar and Manik Varma},
      year={2022},
      eprint={2207.04452},
      archivePrefix={arXiv},
      primaryClass={cs.LG},
      url={https://arxiv.org/abs/2207.04452}, 
}
```