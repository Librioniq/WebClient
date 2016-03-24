import * as express from 'express';
import * as path from 'path';
import * as fs from 'fs';
import {createServer} from 'http';
import environment from './environment';

const dir = process.env.NODE_PATH || path.join(__dirname, "..", "..", "..");

const render = (assets) =>
    `<!DOCTYPE html>
    <html>
    <head>
        <title></title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="stylesheet" href="${assets.styles.main}">
    </head>
    <body>
        <div id="app"></div>
        <script>var environment = ${JSON.stringify(environment)};</script>
        <script src="${assets.javascript.main}"></script>
    </body>
    </html>`;
const app = express();
const server = createServer(app);

app.use("/dist", express.static(path.join(dir, "static", "dist"), {
    maxAge: "200d" // We can cache them as they include hashes
}));
app.use("/", express.static(path.join(__dirname, ".."), {
}));

app.get("/*", (req, res) => res.contentType("text/html; charset=utf8").end(render(JSON.parse(fs.readFileSync(path.resolve(dir, "webpack-assets.json"), "utf-8")))));

export const run = () => {
    if (environment.client.port) {
        const runnable = server.listen(environment.client.port, (err) => {
            if (err) {
                console.error(err);
            }

            console.info('----\n==> 🌎  Client is running on port %s', environment.client.port);
            console.info('==> 💻  Send requests to http://%s:%s', environment.client.host, environment.client.port);
        });

        return runnable;
    } else {
        console.error('==>     ERROR: No PORT environment variable has been specified');
    }
};
