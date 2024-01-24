import YAML from 'yaml';
const metaRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*?)$/;
const descRegex = /^([\s\S]*?)\n<!--more-->\n([\s\S]*?)$/;
function parse(text) {
    if (text === null || text === undefined) {
        return {
            meta: {},
            desc: '',
            content: ''
        };
    }
    text = text.trim();
    // 除meta外的内容
    let meta = '';
    let main = '';
    let desc = '';
    let content = '';
    const metaMatch = text.match(metaRegex);
    if (!metaMatch) {
        main = text;
    }
    else {
        meta = metaMatch[1].trim();
        main = metaMatch[2].trim();
    }
    const descMatch = main.match(descRegex);
    if (!descMatch) {
        content = main;
    }
    else {
        desc = descMatch[1].trim();
        content = descMatch[2].trim();
    }
    return {
        meta: meta ? YAML.parse(meta) : {},
        desc,
        content
    };
}
function stringify(hexo) {
    let meta = '';
    if (hexo.meta) {
        meta = YAML.stringify(hexo.meta);
    }
    let desc = '';
    if (hexo.desc) {
        desc = `${hexo.desc}\n<!--more-->\n`;
    }
    return `---\n${meta}---\n${desc}${hexo.content}`;
}
const Hexo = {
    parse,
    stringify
};
export default Hexo;
