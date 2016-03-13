/// <reference path='../../../../typings/main.d.ts'/>

import {expect} from 'chai';
import * as request from 'supertest';
import * as Server from '../../../main/server';
import {Question} from '../../../main/client/redux/entities';


describe("Routes", function() {
    const url = "http://localhost:8082/api";

    before(done => {
        Server.run();
        done();
    });

    describe("Questions API", function() {

        it("should respond", done => {
            request(url)
                .get('/questions/0')
                .expect('Content-Type', /json/)
                .expect(200) // Status code
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    // Should.js fluent syntax applied
                    res.body.should.have.property('id');
                    expect(res.body.id).to.be.equals(0);
                    done();
                });
        });
    });
});