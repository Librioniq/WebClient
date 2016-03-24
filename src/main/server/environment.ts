export const client: Config = {
    host: process.env.NODE_CLIENT_HOST || "localhost",
    port: Number(process.env.NODE_CLIENT_PORT) || 8085,
    isSecured: Boolean(process.env.NODE_CLIENT_IS_SECURED) || false
};
export const server: Config = {
    host: process.env.NODE_SERVER_HOST || "localhost",
    port: Number(process.env.NODE_SERVER_PORT) || 8086,
    isSecured: Boolean(process.env.NODE_SERVER_IS_SECURED) || false
};


export default { client, server } as Environment;

