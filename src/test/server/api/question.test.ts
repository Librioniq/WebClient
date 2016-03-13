/// <reference path='../../../../typings/main.d.ts'/>

import {expect} from 'chai';
import * as request from 'supertest';
import * as Server from '../../../main/server';


describe("Routes", function() {
    const url = "http://localhost:8082/api";

    before(done => {
        Server.run();
        done();
    });

    describe("Questions API", function() {

        it("should respond with list of entities", done => {
            request(url)
                .get('/questions')
                .expect(200) // Status code
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }

                    expect(res.body).be.a("Array");
                    expect(res.body[0]).have.property('id');
                    expect(res.body[0].id).to.be.equals(0);

                    done();
                });
        });

        it("should respond with entity", done => {
            request(url)
                .get('/questions/0')
                .expect(200) // Status code
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }

                    expect(res.body).to.be.not.undefined;
                    expect(res.body).have.property('id');
                    expect(res.body.id).to.be.equals(0);

                    done();
                });
        });

        it("should create entity", done => {
            request(url)
                .post('/questions')
                .send({
                    title: "New 1",
                    content: "Hello world",
                    createdBy: "string",
                    createdDate: new Date(Date.parse("2016-03-12T20:25:47.800Z")),
                    lastModifiedBy: "string",
                    lastModifiedDate: new Date(Date.parse("2016-03-12T20:25:47.800Z")),
                    rating: 0
                })
                .expect(200) // Status code
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }

                    expect(res.body).to.be.not.undefined;
                    expect(res.body).have.property('id');
                    expect(res.body.id).to.be.equals(1);
                    expect(res.body.title).to.be.equals("New 1");

                    done();
                });
        });

        it("should update entity", done => {
            request(url)
                .put('/questions')
                .send({
                    id: 0,
                    title: "New 2",
                    content: "Hello world",
                    createdBy: "string",
                    createdDate: new Date(Date.parse("2016-03-12T20:25:47.800Z")),
                    lastModifiedBy: "string",
                    lastModifiedDate: new Date(Date.parse("2016-03-12T20:25:47.800Z")),
                    rating: 0
                })
                .expect(200) // Status code
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }

                    expect(res.body).to.be.not.undefined;
                    expect(res.body).have.property('id');
                    expect(res.body.id).to.be.equals(0);
                    expect(res.body.title).to.be.equals("New 2");

                    done();
                });
        });

        it("should delete entity", done => {
            request(url)
                .delete('/questions/0')
                .expect(204) // Status code
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }

                    expect(res.body).to.be.empty;

                    done();
                });
        });
    });
});