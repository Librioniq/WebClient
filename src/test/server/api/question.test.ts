/// <reference path='../../../../typings/main.d.ts'/>

import {expect, should} from 'chai';
import * as request from 'supertest';
import * as Server from '../../../main/server';
import {Question} from '../../../main/client/redux/entities';


describe("Routes", function() {
    const url = "http://localhost:8082/api";

    before(done => {
        Server.run();
        should();
        done();
    });

    describe("Questions API", function() {

        it("should respond", done => {
            request(url)
                .get('/questions/0')
                .expect(200) // Status code
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    // Should.js fluent syntax applied
                    expect(res.body).to.be.not.undefined;
                    res.body.should.have.property('id');
                    expect(res.body.id).to.be.equals(0);
                    done();
                });
        });
    });
});