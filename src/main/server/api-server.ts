import * as express from 'express';
import * as session from 'express-session';
import headers from './utils/headers';
import * as bodyParser from 'body-parser';
// import config from '../src/config';
// import * as actions from './actions/index';
// import {mapUrl} from 'utils/url.js';
// import PrettyError from 'pretty-error';
import {createServer} from 'http';
import routers from './routers';

// const pretty = new PrettyError();
const app = express();
const server = createServer(app);
const config = { port: 8082, host: "localhost" };

app.use(session({
    secret: 'react and redux rule!!!!',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
}));
app.use(headers({
    "Access-Control-Allow-Origin": "*",
    'Access-Control-Allow-Methods': 'POST, PUT, DELETE, GET, OPTIONS',
    'Access-Control-Request-Method': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
}));
app.use(bodyParser.json());
app.use("/api", ...routers);

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