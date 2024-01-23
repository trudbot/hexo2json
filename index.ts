import YAML from 'yaml'

const metaRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*?)$/;
const descRegex = /^([\s\S]*?)\n<!--more-->\n([\s\S]*?)$/;

export function parse(text: string) {
    if (text === null || text === undefined) {
        return {
            meta: {},
            desc: '',
            content: ''
        }
    }
    text = text.trim();
    // 除meta外的内容
    let meta: string = '';
    let main: string = '';
    let desc: string = '';
    let content: string = '';

    const metaMatch = text.match(metaRegex);
    if (!metaMatch) {
        main = text;
    } else {
        meta = metaMatch[1].trim();
        main = metaMatch[2].trim();
    }

    const descMatch = main.match(descRegex);
    if (!descMatch) {
        content = main;
    } else {
        desc = descMatch[1].trim();
        content = descMatch[2].trim();
    }

    return {
        meta: meta ? YAML.parse(meta) : {},
        desc,
        content
    }
}

const Hexo = {
    parse
}

export default Hexo;

