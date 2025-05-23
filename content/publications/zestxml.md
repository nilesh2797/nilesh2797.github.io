---
author: ["<u>Nilesh Gupta</u>", "Sakina Bohra", "Yashoteja Prabhu", "Saurabh Purohit", "Manik Varma"]
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
Extreme Multi-label Learning (XML) involves assigning the subset of most relevant labels to a data point from millions of label choices. A hitherto unaddressed challenge in XML is that of predicting unseen labels with no training points. These form a significant fraction of total labels and contain fresh and personalized information desired by end users. Most existing extreme classifiers are not equipped for zero-shot label prediction and hence fail to leverage unseen labels. As a remedy, this paper proposes a novel approach called ZestXML for the task of Generalized Zero-shot XML (GZXML) where relevant labels have to be chosen from all available seen and unseen labels. ZestXML learns to project a data point’s features close to the features of its relevant labels through a highly sparsified linear transform. This 𝐿0-constrained linear map between the two highdimensional feature vectors is tractably recovered through a novel optimizer based on Hard Thresholding. By effectively leveraging the sparsities in features, labels and the learnt model, ZestXML achieves higher accuracy and smaller model size than existing XML approaches while also promoting efficient training & prediction, real-time label update as well as explainable prediction. Experiments on large-scale GZXML datasets demonstrated that ZestXML can be up to 14% and 10% more accurate than state-ofthe-art extreme classifiers and leading BERT-based dense retrievers respectively, while having 10x smaller model size. ZestXML trains on largest dataset with 31M labels in just 30 hours on a single core of a commodity desktop. When added to an large ensemble of existing models in Bing Sponsored Search Advertising, ZestXML significantly improved click yield of IR based system by 17% and unseen query coverage by 3.4% respectively. ZestXML’s source code and benchmark datasets for GZXML will be publically released for research purposes here.

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