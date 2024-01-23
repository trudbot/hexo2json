import yaml from 'yaml'
const metaRegex = /---([\s\S]*?)---/;
const descRegex = /---[\s\S]*?---([\s\S]*?)<!--more-->/;
const contentRegex1 = /<!--more-->([\s\S]*?)$/;
const contentRegex2 = /---[\s\S]*?---([\s\S]*?)$/;

export function tran(str) {
    const meta = metaRegex.exec(str)[1];
    let desc;
    let content;
    const descRes = descRegex.exec(str);
    if (descRes) {
        desc = descRes[1];
        content = contentRegex1.exec(str)[1];
    } else {
        content = contentRegex2.exec(str)[1];
    }
    return {
        meta: yaml.parse(meta),
        desc,
        content
    }
}

import fs from 'fs';
import path from 'path';

function traverseMdFiles(folderPath, callback) {
  // 读取指定文件夹下的所有文件
  let files = fs.readdirSync(folderPath);

  // 遍历每个文件
  files = files.slice(1, 2);
  files.forEach((file) => {
    const filePath = path.join(folderPath, file);

    // 检查文件的类型
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      // 如果是文件夹，递归遍历
      traverseMdFiles(filePath, callback);
    } else if (stats.isFile() && file.endsWith('.md')) {
      // 如果是md文件，调用回调函数
      callback(filePath);
    }
  });
}

const folderPath = './source/_posts';

export function hexo2json(pth = folderPath) {
    const res = [];
    traverseMdFiles(pth, (filePath) => {
        res.push(tran(fs.readFileSync(filePath, 'utf8')));
    });
    return res;
}
