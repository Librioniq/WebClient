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
import environment from './environment';
import {dbInit} from './utils/dbInit';

// const pretty = new PrettyError();
const app = express();
const server = createServer(app);

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
    if (environment.server.port) {
        const runnable = server.listen(environment.server.port, (err) => {
            if (err) {
                console.error(err);
            }

            dbInit(); // initialize database with dummy data;

            console.info('----\n==> 🌎  API is running on port %s', environment.server.port);
            console.info('==> 💻  Send requests to http://%s:%s', environment.server.host, environment.server.port);
        });

        return runnable;
    } else {
        console.error('==>     ERROR: No PORT environment variable has been specified');
    }
};