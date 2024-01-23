import Hexo from './index.js'

String.prototype.expectEqual = function(obj) {
    const res = JSON.stringify(Hexo.parse(this));
    if (res !== JSON.stringify(obj)) {
        errNum++;
        console.error(`Expected ${this} \nto equal \n${JSON.stringify(obj)}`)
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
`, {
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
`, {
    meta: {},
    desc: 'd\nf',
    content: 'abc'
})

if (errNum === 0) {
    console.log('you perfect!');
}