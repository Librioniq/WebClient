import RequestConverter from './RequestConverter';
import * as Url from './Url';
export function post(obj: any): RequestInit {
    return {
        method: "post",
        body: RequestConverter.convert(obj),
    };
}


export function put(obj: any): RequestInit {
    return {
        method: "put",
        body: RequestConverter.convert(obj),
    };
}


export function remove(url: string, obj?: any): IRequest {
    return new Request(`${url}?${obj && Object.keys(obj).map(key => `${key}=${obj[key]}`).join("&")}`, { method: "delete" });
}


export function get(url: string, obj?: any): IRequest {
    return new Request(`${url}?${obj && Object.keys(obj).map(key => `${key}=${obj[key]}`).join("&")}`);
}