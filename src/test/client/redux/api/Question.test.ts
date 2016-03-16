/// <reference path='../../../../../typings/main.d.ts'/>

import {expect} from 'chai';
import QuestionApi from '../../../../../src/main/client/redux/api/Question';
import {Question} from '../../../../../src/main/client/redux/entities';
import Server from '../../../../main/server/index';
import {assign} from 'lodash';

describe("Redux Api", () => {
    const questionsApi = new QuestionApi();
    const stubRequestData: Question = {
        title: "hi World",
        content: "Some Content"
    };
    const updatedRequestData: Question = {
        id: 0,
        title: "hi World Updated",
        content: "Some Content"
    };
    let server;

    before(done => {
        const formDataKey = "FormData";
        const blobKey = "Blob";

        server = Server.Api.run();
        global[formDataKey] = () => { console.log(formDataKey); };
        global[blobKey] = () => { console.log(blobKey); };

        done();
    });
    after(() => server.close());

    describe(`Question`, () => {

        it("#list method should respond", (done) => {
            questionsApi.list()
                .then((res) => {
                    expect(res.status).to.be.equal(200);

                    res.json<Question>().then(data => {
                        expect(data).to.be.instanceof(Array)
                            .and.has.property("length").to.be.greaterThan(0);
                        expect(data[0]).has.property("id");
                        done();
                    }).catch(err => done(err));
                }, err => done(err))
                .catch(err => done(err));
        });

        it("#get method should respond", (done) => {
            questionsApi.get(0)
                .then((res) => {
                    expect(res.status).to.be.equal(200);

                    res.json<Question>().then(data => {
                        expect(data).to.be.not.empty.and.not.undefined;
                        expect(data.id).to.be.equal(0);
                        done();
                    }).catch(err => done(err));
                }, err => done(err))
                .catch(err => done(err));
        });

        it("#post method should respond", (done) => {
            questionsApi.post(stubRequestData)
                .then((res) => {
                    expect(res.status).to.be.equal(200);

                    res.json<Question>().then(data => {
                        expect(data).is.not.empty;
                        expect(data).to.have.property("id").equal(1);
                        expect(data.title).to.be.equal(stubRequestData.title);
                        expect(data.content).to.be.equal(stubRequestData.content);

                        done();
                    }).catch(err => done(err));
                }, err => done(err))
                .catch(err => done(err));
        });

        it("#put method should respond", (done) => {
            questionsApi.put(updatedRequestData)
                .then((res) => {
                    expect(res.status).to.be.equal(200);

                    res.json<Question>().then(data => {
                        const expected = assign({}, data, updatedRequestData) as Question;

                        expect(data).is.not.empty;
                        expect(data).to.be.deep.equal(expected);

                        done();
                    }).catch(err => done(err));
                }, err => done(err))
                .catch(err => done(err));
        });

        it("#delete method should respond", (done) => {
            questionsApi.delete(0)
                .then((res) => {
                    expect(res.status).to.be.equal(204);
                    done();
                }, err => done(err))
                .catch(err => done(err));
        });
    });
});