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

export const client: Config = process.env.client || {
    host: "localhost",
    port: 8085,
    isSecured: false
};
export const server: Config = process.env.server || {
    host: "localhost",
    port: 8086,
    isSecured: false
};


export default { client, server } as Environment;

