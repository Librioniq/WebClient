/**
 * replace arg
 */
export function match(url: string, ...params: any[]);
export function match(url: string, named: any);
export function match(url: string, obj: any) {
    let replacer: (...args: any[]) => any;

    if (obj instanceof Array) {
        replacer = () => (obj as Array<any>).shift();
    } else {
        replacer = (arg, key) => obj[key];
    }

    return url.replace(/\/:([a-zA-Z0-9-_.,]+)/g, replacer);
}
