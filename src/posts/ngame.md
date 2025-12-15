---
author: ["Kunal Dahiya*", "<u>Nilesh Gupta</u>*", "Deepak Saini*", "Akshay Soni", Yajun Wang, Kushal Dave, Jian Jiao, Gururaj K, Prasenjit Dey, Amit Singh, Deepesh Hada, Vidit Jain, Bhawna Paliwal, Anshul Mittal, Sonu Mehta, Ramachandran Ramjee, Sumeet Agarwal, Purushottam Kar, Manik Varma]
title: "NGAME: Negative Mining aware Mini-batching for Extreme Classification"
date: "2023-08-01"
venue: "WSDM 2023"
summary: "A light-weight mini-batch creation technique that offers provably accurate in-batch negative samples for training retrieval models. This allows training with larger mini-batches offering significantly faster convergence and higher accuracies than existing negative sampling techniques."
description: ""
tags: ["Information-Retrieval", "Encoder", "Extreme-Classification", "WSDM"]
categories: ["Publications"]
series: ["Publications"]
links:
  - text: "Paper"
    url: "https://arxiv.org/abs/2207.04452"
  - text: "Code"
    url: "https://github.com/Extreme-classification/ngame"
  - text: "Bibtex"
    url: "/publications/ngame/#cite"
ShowToc: true
TocOpen: false
draft: false
---

### About
Extreme Classification (XC) seeks to tag data points with the most relevant subset of labels from an extremely large label set. Performing deep XC with dense, learnt representations for data points and labels has attracted much attention due to its superiority over earlier XC methods that used sparse, hand-crafted features. Negative mining techniques have emerged as a critical component of all deep XC methods that allow them to scale to millions of labels. However, despite recent advances, training deep XC models with large encoder architectures such as transformers remains challenging. This paper identifies that memory overheads of popular negative mining techniques often force mini-batch sizes to remain small and slow training down. In response, this paper introduces NGAME, a light-weight mini-batch creation technique that offers provably accurate in-batch negative samples. This allows training with larger mini-batches offering significantly faster convergence and higher accuracies than existing negative sampling techniques. NGAME was found to be up to 16% more accurate than state-of-the-art methods on a wide array of benchmark datasets for extreme classification, as well as 3% more accurate at retrieving search engine queries in response to a user webpage visit to show personalized ads. In live A/B tests on a popular search engine, NGAME yielded up to 23% gains in click-through-rates.

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