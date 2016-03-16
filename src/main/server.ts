/// <reference path='../../typings/main.d.ts'/>
import Server from './server/index';

Server.Client.run();

if (process.env.NODE_ENV !== 'production') {
    Server.Api.run();
}