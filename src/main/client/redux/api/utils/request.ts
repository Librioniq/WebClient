import * as Url from './Url';

export function convert(obj: any) {
    if (!obj) {
        return obj;
    } else if (obj instanceof FormData || obj instanceof Blob) {
        return obj;
    } else {
        return JSON.stringify(obj);
    }
}

export function post(obj?: any): RequestInit {
    return {
        method: "POST",
        body: convert(obj),
    };
}


export function put(obj?: any): RequestInit {
    return {
        method: "PUT",
        body: convert(obj),
    };
}


export function remove(url: string, obj?: any): IRequest {
    return new Request(url + (obj ? `?${Object.keys(obj).map(key => `${key}=${obj[key]}`).join("&")}` : ""), { method: "DELETE" });
}


export function get(url: string, obj?: any): IRequest {
    return new Request(url + (obj ? `?${Object.keys(obj).map(key => `${key}=${obj[key]}`).join("&")}` : ""));
}