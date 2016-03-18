/// <reference path='../../../../typings/main.d.ts'/>

import {expect} from 'chai';
import * as request from 'supertest';
import Server from '../../../main/server/index';


describe("Routers", function() {
    const url = "http://localhost:8082/api";
    let server;

    before(done => {
        server = Server.Api.run();

        done();
    });

    after(() => server.close());

    describe("Comments Router", function() {

        it("should respond with list of comments", done => {
            request(url)
                .get('/posts/0/comments')
                .expect(200) // Status code
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) {
                        done(err);
                    }

                    expect(res.body).be.an("Array");
                    expect(res.body[0]).have.property('id');
                    expect(res.body[0].id).to.be.equals(0);

                    done();
                });
        });

        it("should respond with comment", done => {
            request(url)
                .get('/posts/0/comments/0')
                .expect(200) // Status code
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) {
                        done(err);
                    }

                    expect(res.body).to.be.not.undefined;
                    expect(res.body).have.property('id');
                    expect(res.body.id).to.be.equals(0);

                    done();
                });
        });

        it("should create comment", done => {
            request(url)
                .post('/posts/0/comments')
                .send({
                    content: "Hello world1231",
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
                    }

                    expect(res.body).to.be.not.undefined;
                    expect(res.body).have.property('id');
                    expect(res.body.id).to.be.equals(1);
                    expect(res.body.content).to.be.equals("Hello world1231");

                    done();
                });
        });

        it("should update comment", done => {
            request(url)
                .put('/posts/0/comments')
                .send({
                    id: 0,
                    content: "Hello",
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
                    }

                    expect(res.body).to.be.not.undefined;
                    expect(res.body).have.property('id');
                    expect(res.body.id).to.be.equals(0);
                    expect(res.body.content).to.be.equals("Hello");

                    done();
                });
        });

        it("should delete comment", done => {
            request(url)
                .delete('/posts/0/comments/0')
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