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

    describe("User Router", () => {
        it("should respond with user", (done) => {
            request(url)
                .get('/users/1')
                .expect(200) // Status code
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) {
                        done(err);

                        return;
                    }

                    expect(res.body).to.be.not.empty;
                    expect(res.body).have.property('firstName').equals("Oleh");
                    expect(res.body).have.property('lastName').equals("Dokuka");

                    done();
                });
        });
    });
});
