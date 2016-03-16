/// <reference path='../../../../../typings/main.d.ts'/>

import {expect} from 'chai';
import * as questionModule from '../../../../main/client/redux/modules/question';


const GET_QUESTION = 'api/QUESTIONS:GET';
const LIST_QUESTIONS = 'api/QUESTIONS:LIST';
const CREATE_QUESTION = 'api/QUESTIONS:POST';
const UPDATE_QUESTION = 'api/QUESTIONS:PUT';
const DELETE_QUESTION = 'api/QUESTIONS:DELETE';

describe("Redux Modules", function() {
    describe("Question", function() {
        it("should return `get` action", () => {
            const action = questionModule.getQuestion(undefined);

            expect(action).has.property("type");
            expect(action).has.property("payload");
            expect(action.type).to.be.equal(GET_QUESTION);
            expect(action.payload).to.be.a(typeof Function);
        });
        it("should return `list` action", () => {
            const action = questionModule.listQuestion();

            expect(action).has.property("type");
            expect(action).has.property("payload");
            expect(action.type).to.be.equal(LIST_QUESTIONS);
            expect(action.payload).to.be.a(typeof Function);
        });
        it("should return `create` action", () => {
            const action = questionModule.createQuestion(undefined);

            expect(action).has.property("type");
            expect(action).has.property("payload");
            expect(action.type).to.be.equal(CREATE_QUESTION);
            expect(action.payload).to.be.a(typeof Function);
        });
        it("should return `update` action", () => {
            const action = questionModule.updateQuestion(undefined);

            expect(action).has.property("type");
            expect(action).has.property("payload");
            expect(action.type).to.be.equal(UPDATE_QUESTION);
            expect(action.payload).to.be.a(typeof Function);
        });
        it("should return `delete` action", () => {
            const action = questionModule.deleteQuestion(undefined);

            expect(action).has.property("type");
            expect(action).has.property("payload");
            expect(action.type).to.be.equal(DELETE_QUESTION);
            expect(action.payload).to.be.a(typeof Function);
        });
    });
});