/// <reference path='../../../../typings/main.d.ts'/>

import {post, postToPosts} from '../../../main/server/database';
import {expect} from 'chai';
import * as request from 'supertest';
import environment from '../../../main/server/environment';
import Server from '../../../main/server/index';


describe("Routers", function() {
    const url = `http${environment.server.isSecured ? "s" : ""}://${environment.server.host}:${environment.server.port}/api`;
    let server;

    before(done => {
        server = Server.Api.run();

        done();
    });

    after(() => {
        server.close();
        post.clear();
        postToPosts.clear();
    });

    describe("Questions Router", function() {

        it("should respond with list of questions", done => {
            request(url)
                .get('/questions')
                .expect(200) // Status code
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) {
                        done(err);
                    }

                    expect(res.body).be.a("Array");
                    expect(res.body[0]).have.property('id');

                    done();
                });
        });

        it("should respond with question", done => {
            request(url)
                .get('/questions/2')
                .expect(200) // Status code
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) {
                        done(err);
                    }

                    expect(res.body).to.be.not.undefined;
                    expect(res.body).have.property('id');

                    done();
                });
        });

        it("should create question", done => {
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
                .expect(201)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) {
                        done(err);
                        return;
                    }

                    expect(res.body).to.be.not.undefined;
                    expect(res.body).have.property('id');
                    expect(res.body.title).to.be.equals("New 1");

                    done();
                });
        });

        it("should update question", done => {
            request(url)
                .put('/questions')
                .send({
                    id: 2,
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
                        done(err);

                        return;
                    }

                    expect(res.body).to.be.not.undefined;
                    expect(res.body).have.property('id');
                    expect(res.body.id).to.be.equals(2);
                    expect(res.body.title).to.be.equals("New 2");

                    done();
                });
        });

        it("should delete question", done => {
            request(url)
                .delete('/questions/0')
                .expect(204) // Status code
                .end(function(err, res) {
                    if (err) {
                        done(err);

                        return;
                    }

                    expect(res.body).to.be.empty;

                    done();
                });
        });
    });
});