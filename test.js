import Hexo from './index.js'

String.prototype.expectEqual = function(obj) {
    const res = JSON.stringify(Hexo.parse(this));
    if (res !== JSON.stringify(obj)) {
        errNum++;
        console.error(`When test parse:\nExpected ${this} \nto equal \n${JSON.stringify(obj)}`)
    }
    const rev = Hexo.parse(Hexo.stringify(Hexo.parse(this)));
    if (JSON.stringify(rev) !== JSON.stringify(obj)) {
        errNum++;
        console.error(`When test stringify:\nExpected ${JSON.stringify(rev)} \nto equal \n${JSON.stringify(obj)}`)
    }
}

function test(s, obj) {
    s.expectEqual(obj);
}

let errNum = 0;

//
test(`
---
a: b
c: a
b: a
---
desc
<!--more-->
content
`,
{
    meta: {
        a: 'b',
        c: 'a',
        b: 'a'
    },
    desc: 'desc',
    content: 'content'
})

//
test(`
---
a: b
---abfs
`,
{
    meta: {},
    desc: '',
    content: '---\na: b\n---abfs'
})

//
test(`
abc
`,
{
    meta: {},
    desc: '',
    content: 'abc'
})


//
test(`
---
a: 
- b
- c
---
abc
`, 
{
    meta: {
        a: ['b', 'c']
    },
    desc: '',
    content: 'abc'
})

//
test(`
d
f
<!--more-->
abc
`, 
{
    meta: {},
    desc: 'd\nf',
    content: 'abc'
})

if (errNum === 0) {
    console.log('you perfect!');
}

const s = `---
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
博客正文`
console.log(Hexo.parse(s);