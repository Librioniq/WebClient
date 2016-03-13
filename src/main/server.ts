/// <reference path='../../typings/main.d.ts'/>

import * as express from 'express';
import * as session from 'express-session';
import * as bodyParser from 'body-parser';
// import config from '../src/config';
// import * as actions from './actions/index';
// import {mapUrl} from 'utils/url.js';
// import PrettyError from 'pretty-error';
import {createServer} from 'http';
import api from './server/api';

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
app.use(bodyParser.json());
app.use(...api);

// app.use((req, res) => {
//     const splittedUrlPath = req.url.split('?')[0].split('/').slice(1);
//     const {action, params} = mapUrl(actions, splittedUrlPath);

//     if (action) {
//         action(req, params)
//             .then((result) => {
//                 if (result instanceof Function) {
//                     result(res);
//                 } else {
//                     res.json(result);
//                 }
//             }, (reason) => {
//                 if (reason && reason.redirect) {
//                     res.redirect(reason.redirect);
//                 } else {
//                     console.error('API ERROR:', /*pretty.render*/(reason));
//                     res.status(reason.status || 500).json(reason);
//                 }
//             });
//     } else {
//         res.status(404).end('NOT FOUND');
//     }
// });

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