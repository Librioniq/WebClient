/// <reference path='../../../../typings/main.d.ts'/>

import {clear} from '../../../main/server/database';
import {expect} from 'chai';
import * as request from 'supertest';
import environment from '../../../main/server/environment';
import Server from '../../../main/server/index';

describe("Routers", () => {
    const url = `http${environment.server.isSecured ? "s" : ""}://${environment.server.host}:${environment.server.port}/api`;
    let server;

    before(done => {
        server = Server.Api.run();

        done();
    });

    after(() => {
        server.close();
        clear();
    });

    describe("Auth Router", () => {
        it("should authorize user", (done) => {
            request(url)
                .post('/auth')
                .send({
                    login: "admin",
                    password: "admin"
                })
                .expect(200) // Status code
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) {
                        done(err);

                        return;
                    }

                    expect(res.body).to.be.not.empty;
                    expect(res.body).have.property('userId').equals(1);

                    done();
                });
        });
    });
});
