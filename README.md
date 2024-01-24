# hexo2json
Convert blogs in hexo to JSON format!
## Usage
hexo框架有如下博客格式.
```
---
title: blog title
mathjax: true
tags:
  - tag1
  - tag2
categories: cg1
abbrlink: 23124
date: 2023-02-27 21:46:38
---
博客的摘要、前言。
<!--more-->
博客正文
```

使用`hexo2json`, 将它转换为如下格式!
```
{
  meta: {
    title: 'blog title',
    mathjax: true,
    tags: [ 'tag1', 'tag2' ],
    categories: 'cg1',
    abbrlink: 23124,
    date: '2023-02-27 21:46:38'
  },
  desc: '博客的摘要、前言。',
  content: '博客正文'
}
```
Install through NPM and use it in a browser or node
```
npm install hexo2json
```

```
import Hexo from hexo2json
const blogText = "desc\n<!--more-->\ncontent";
const resultJson = Hexo.parse(blogText);
console.log(resultJson);
console.log(Hexo.stringify(resultJson));
```