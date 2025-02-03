---
author: ["Yashoteja Prabhu", "Aditya Kusupati", "*Nilesh Gupta*", "Manik Varma"]
title: "Extreme Regression for Dynamic Search Advertising"
date: "2020-05-19"
venue: "WSDM 2020"
description: ""
summary: "This paper introduces a new learning paradigm called eXtreme Regression (XR) whose objective is to accurately predict the numerical degrees of relevance of an extremely large number of labels to a data point. XR can provide elegant solutions to many large-scale ranking and recommendation applications including Dynamic Search Advertising (DSA)."
tags: ["information-retrieval", "Encoder", "extreme-classification", "WSDM"]
categories: ["Publications"]
series: ["Publications"]
ShowToc: true
TocOpen: false
draft: false
---

[Paper](https://arxiv.org/abs/2001.05228) | [Code](http://manikvarma.org/code/XReg/download.html)

### About
Dual-encoder (DE) models are widely used in retrieval tasks, most commonly studied on open QA benchmarks that are often characterized by multi-class and limited training data. In contrast, their performance in multi-label and data-rich retrieval settings like extreme multi-label classification (XMC), remains under-explored. Current empirical evidence indicates that DE models fall significantly short on XMC benchmarks, where SOTA methods (Dahiya et al., 2023a;b) linearly scale the number of learnable parameters with the total number of classes (documents in the corpus) by employing per-class classification head. To this end, we first study and highlight that existing multi-label contrastive training losses are not appropriate for training DE models on XMC tasks. We propose decoupled softmax loss – a simple modification to the InfoNCE loss – that overcomes the limitations of existing contrastive losses. We further extend our loss design to a soft top-k operator-based loss which is tailored to optimize top-k prediction performance. When trained with our proposed loss functions, standard DE models alone can match or outperform SOTA methods by up to 2% at Precision@1 even on the largest XMC datasets while being 20× smaller in terms of the number of trainable parameters. This leads to more parameter-efficient and universally applicable solutions for retrieval tasks.

### Cite
```bib
@inproceedings{Prabhu_2020, series={WSDM ’20},
   title={Extreme Regression for Dynamic Search Advertising},
   url={http://dx.doi.org/10.1145/3336191.3371768},
   DOI={10.1145/3336191.3371768},
   booktitle={Proceedings of the 13th International Conference on Web Search and Data Mining},
   publisher={ACM},
   author={Prabhu, Yashoteja and Kusupati, Aditya and Gupta, Nilesh and Varma, Manik},
   year={2020},
   month=jan, pages={456–464},
   collection={WSDM ’20} }
```