declare interface Config {
    host: string;
    port: number;
    isSecured?: boolean;
}

declare interface Environment {
    client: Config;
    server: Config;
}

declare const environment: Environment;