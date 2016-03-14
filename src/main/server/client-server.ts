import * as express from 'express';
import * as path from 'path';
import * as fs from 'fs';
import {createServer} from 'http';


const render = (assets) =>
    `<!DOCTYPE html>
    <html>
    <head>
        <title>TodoMVC</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="stylesheet" href="${assets.styles.main}">
    </head>
    <body>
        <div id="app"></div>
        <script src="${assets.javascript.main}"></script>
    </body>
    </html>`;
const app = express();
const server = createServer(app);
const config = { port: 8080, host: "localhost" };

app.use("/dist", express.static(path.join(__dirname, "..", "..", "..", "static", "dist"), {
    maxAge: "200d" // We can cache them as they include hashes
}));
app.use("/", express.static(path.join(__dirname, ".."), {
}));

app.get("/*", (req, res) => res.header({
    "Access-Control-Allow-Origin": "*",
    'Access-Control-Allow-Methods': 'POST, PUT, DELETE, GET, OPTIONS',
    'Access-Control-Request-Method': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
}).contentType("text/html; charset=utf8").end(render(JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../../webpack-assets.json"), "utf-8")))));

export const run = () => {
    if (config.port) {
        const runnable = server.listen(config.port, (err) => {
            if (err) {
                console.error(err);
            }

            console.info('----\n==> 🌎  API is running on port %s', config.port);
            console.info('==> 💻  Send requests to http://%s:%s', config.host, config.port);
        });

        return runnable;
    } else {
        console.error('==>     ERROR: No PORT environment variable has been specified');
    }
};