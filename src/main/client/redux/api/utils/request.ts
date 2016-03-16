import * as Url from './Url';
import {assign} from 'lodash';

export function convert(obj: any): RequestInit {
    if (!obj) {
        return {};
    } else if (obj instanceof FormData || obj instanceof Blob) {
        return {
            body: obj
        };
    } else {
        return {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        };
    }
}

export function post(obj?: any): RequestInit {
    return assign({}, { method: "POST" }, convert(obj));
}


export function put(obj?: any): RequestInit {
    return assign({}, { method: "PUT" }, convert(obj));
}


export function remove(url: string, obj?: any): IRequest {
    return new Request(url + (obj ? `?${Object.keys(obj).map(key => `${key}=${obj[key]}`).join("&")}` : ""), { method: "DELETE" });
}


export function get(url: string, obj?: any): IRequest {
    return new Request(url + (obj ? `?${Object.keys(obj).map(key => `${key}=${obj[key]}`).join("&")}` : ""));
}