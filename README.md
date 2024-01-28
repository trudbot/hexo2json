# hexo2json
Convert blogs in hexo to JSON format!

* Use parse to convert hexo style blog text into JSON.
* Use stringify to convert the specified JSON format into a hexo blog.

Hexo2json helps with your blog migration!
## Usage
hexo框架有如下博客格式.
```markdown
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
```javascript
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
```shell
npm install hexo2json
```

```javascript
import Hexo from hexo2json
const blogText = "desc\n<!--more-->\ncontent";
const resultJson = Hexo.parse(blogText);
console.log(resultJson);
console.log(Hexo.stringify(resultJson));
```
