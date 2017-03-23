//去除空格
export const trim = (str)=> {
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}