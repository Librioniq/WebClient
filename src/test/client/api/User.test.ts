/// <reference path='../../../../typings/main.d.ts'/>

import {clear} from '../../../main/server/database';
import {expect} from 'chai';
import * as Api from '../../../../src/main/client/api';
import Server from '../../../main/server/index';
import environment from '../../../main/server/environment';

describe("Redux Api", () => {
    let server;
    let userApi: Api.User;

    before(done => {
        const formDataKey = "FormData";
        const blobKey = "Blob";
        const envKey = "environment";

        global[formDataKey] = () => { console.log(formDataKey); };
        global[blobKey] = () => { console.log(blobKey); };
        global[envKey] = environment;

        server = Server.Api.run();
        userApi = new Api.User();

        done();
    });
    after(() => {
        server.close();
        clear();
    });

    describe(`User`, () => {
        it("should respond with user", (done) => {
            userApi.get(1)
                .then((res) => {
                    expect(res.status).to.be.equal(200);

                    res.json().then(data => {
                        expect(data).have.property('firstName').equals("Oleh");
                        expect(data).have.property('lastName').equals("Dokuka");

                        done();
                    }).catch(err => done(err));
                }, err => done(err))
                .catch(err => done(err));
        });
    });
});