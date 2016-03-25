/**
 * replace arg
 */
/* tslint:disable:no-unused-variable */
export function expand(url: string, ...params: any[]);
export function expand(url: string, named: any);
export function expand(url: string, obj: any) {
    let replacer: (...args: any[]) => any;

    if (obj instanceof Array) {
        replacer = () => `/${(obj as Array<any>).shift()}`;
    } else {
        replacer = (arg, key) => `/${obj[key]}`;
    }

    return url.replace(/\/:([a-zA-Z0-9-_.,]+)/g, replacer);
}
