---
author: ["AtulaTejaswi*", "*Nilesh Gupta**", "Eunsol Choi"]
title: "Exploring Design Choices for Building Language-Specific LLMs"
date: "2025-02-02"
venue: "EMNLP 2024"
description: ""
summary: "This paper examines how adapting LLMs with vocabulary extension and pretraining improves efficiency and performance across languages"
links:
  - text: "Paper"
    url: "https://arxiv.org/abs/2406.14670"
  - text: "Code"
    url: "https://github.com/atutej/token-language-adaptation"
  - text: "Bibtex"
    url: "/publications/language_specific_llms/#cite"
tags: ["Language-Specific LLMs", "Efficient Adaptation", "Multilingualism"]
categories: ["Publications"]
series: ["Publications"]
ShowToc: true   
TocOpen: false
draft: false
---

### About

Despite rapid progress in large language models (LLMs), their performance on a vast majority of languages remains unsatisfactory. In this paper, we study building language-specific LLMs by adapting monolingual and multilingual LLMs. We conduct systematic experiments on how design choices (base model selection, vocabulary extension, and continued pretraining) impact the adapted LLM, both in terms of efficiency (how many tokens are needed to encode the same amount of information) and end task performance. We find that (1) the initial performance of LLM does not always correlate with the final performance after the adaptation. Adapting an English-centric models can yield better results than adapting multilingual models despite their worse initial performance on low-resource languages. (2) Efficiency can easily improved with simple vocabulary extension and continued pretraining in most LLMs we study, and (3) The optimal adaptation method (choice of the base model, new vocabulary size, training data, initialization strategy) is highly language-dependent, and the simplest embedding initialization works well across various experimental settings. Together, our work lays foundations on efficiently building language-specific LLMs by adapting existing LLMs.

### Cite
```bib
@misc{tejaswi2024exploringdesignchoicesbuilding,
      title={Exploring Design Choices for Building Language-Specific LLMs}, 
      author={Atula Tejaswi and Nilesh Gupta and Eunsol Choi},
      year={2024},
      eprint={2406.14670},
      archivePrefix={arXiv},
      primaryClass={cs.CL},
      url={https://arxiv.org/abs/2406.14670}, 
}
```