/// <reference path='../../../../typings/main.d.ts'/>

import {clear} from '../../../main/server/database';
import {expect} from 'chai';
import * as Api from '../../../../src/main/client/api';
import Server from '../../../main/server/index';
import environment from '../../../main/server/environment';

describe("Redux Api", () => {
    let server;
    let authApi: Api.Auth;

    before(done => {
        const formDataKey = "FormData";
        const blobKey = "Blob";
        const envKey = "environment";

        global[formDataKey] = () => { console.log(formDataKey); };
        global[blobKey] = () => { console.log(blobKey); };
        global[envKey] = environment;

        server = Server.Api.run();
        authApi = new Api.Auth();

        done();
    });
    after(() => {
        server.close();
        clear();
    });

    describe(`Auth`, () => {
        it("should authorize user", (done) => {
            authApi.authorize("admin", "admin")
                .then((res) => {
                    expect(res.status).to.be.equal(200);

                    res.json().then(data => {
                        expect(data).have.property('userId').equals(1);

                        done();
                    }).catch(err => done(err));
                }, err => done(err))
                .catch(err => done(err));
        });
    });
});