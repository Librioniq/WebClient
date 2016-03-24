/// <reference path='../../../../../typings/main.d.ts'/>

import {expect} from 'chai';
import * as Api from '../../../../../src/main/client/api';
import * as Entities from '../../../../../src/main/client/entities';
import Server from '../../../../main/server/index';
import environment from '../../../../main/server/environment';
import {assign} from 'lodash';

describe("Redux Api", () => {
    let server;
    let commentsApi: Api.Comment;

    before(done => {
        const formDataKey = "FormData";
        const blobKey = "Blob";
        const envKey = "environment";

        global[formDataKey] = () => { console.log(formDataKey); };
        global[blobKey] = () => { console.log(blobKey); };
        global[envKey] = environment;

        server = Server.Api.run();
        commentsApi = new Api.Comment();

        done();
    });
    after(() => server.close());

    describe(`Comment`, () => {
        const stubRequestData: Entities.Comment = {
            content: "Some Content"
        };
        const updatedRequestData: Entities.Comment = {
            id: 2,
            content: "Some Content Updated"
        };

        it("#list method should respond", (done) => {
            commentsApi.list(0)
                .then((res) => {
                    expect(res.status).to.be.equal(200);

                    res.json().then(data => {
                        expect(data).to.be.instanceof(Array)
                            .and.has.property("length").to.be.greaterThan(0);
                        expect(data[0]).has.property("id");
                        done();
                    }).catch(err => done(err));
                }, err => done(err))
                .catch(err => done(err));
        });

        it("#get method should respond", (done) => {
            commentsApi.get(0, 2)
                .then((res) => {
                    expect(res.status).to.be.equal(200);

                    res.json().then(data => {
                        expect(data).to.be.not.empty.and.not.undefined;
                        expect(data.id).to.be.equal(2);
                        done();
                    }).catch(err => done(err));
                }, err => done(err))
                .catch(err => done(err));
        });

        it("#post method should respond", (done) => {
            commentsApi.post(0, stubRequestData)
                .then((res) => {
                    expect(res.status).to.be.equal(200);

                    res.json().then(data => {
                        expect(data).is.not.empty;
                        expect(data).to.have.property("id").equal(1);
                        expect(data.content).to.be.equal(stubRequestData.content);

                        done();
                    }).catch(err => done(err));
                }, err => done(err))
                .catch(err => done(err));
        });

        it("#put method should respond", (done) => {
            commentsApi.put(0, updatedRequestData)
                .then((res) => {
                    expect(res.status).to.be.equal(200);

                    res.json().then(data => {
                        const expected = assign({}, data, updatedRequestData) as Entities.Comment;

                        expect(data).is.not.empty;
                        expect(data).to.be.deep.equal(expected);

                        done();
                    }).catch(err => done(err));
                }, err => done(err))
                .catch(err => done(err));
        });

        it("#delete method should respond", (done) => {
            commentsApi.delete(0, 2)
                .then((res) => {
                    expect(res.status).to.be.equal(204);
                    done();
                }, err => done(err))
                .catch(err => done(err));
        });
    });
});