export abstract class Api {
    constructor(protected endpoint: string) {
        this.endpoint = `http${environment.server.isSecured ? "s" : ""}://${environment.server.host}:${environment.server.port}/${endpoint}`;
    }
}

export interface Response<T> extends IResponse {
    json(): Promise<T>;
    json<K extends T>(): Promise<K>;
}