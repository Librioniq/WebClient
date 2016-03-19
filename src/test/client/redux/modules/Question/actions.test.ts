/// <reference path='../../../../../../typings/main.d.ts'/>

import {expect} from 'chai';
import {Actions} from '../../../../../main/client/redux/modules/Question';
import {CREATE, DELETE, UPDATE, GET, LIST} from '../../../../../main/client/redux/modules/Question/constants';

describe("Redux Modules", function() {
    describe("Question Actions", function() {
        it("should return `get` action", () => {
            const action = Actions.get(undefined);

            expect(action).has.property("type");
            expect(action).has.property("payload");
            expect(action.type).to.be.equal(GET);
            expect(action.payload).to.be.a(typeof Function);
        });
        it("should return `list` action", () => {
            const action = Actions.list();

            expect(action).has.property("type");
            expect(action).has.property("payload");
            expect(action.type).to.be.equal(LIST);
            expect(action.payload).to.be.a(typeof Function);
        });
        it("should return `create` action", () => {
            const action = Actions.create(undefined);

            expect(action).has.property("type");
            expect(action).has.property("payload");
            expect(action.type).to.be.equal(CREATE);
            expect(action.payload).to.be.a(typeof Function);
        });
        it("should return `update` action", () => {
            const action = Actions.update(undefined);

            expect(action).has.property("type");
            expect(action).has.property("payload");
            expect(action.type).to.be.equal(UPDATE);
            expect(action.payload).to.be.a(typeof Function);
        });
        it("should return `delete` action", () => {
            const action = Actions.remove(undefined);

            expect(action).has.property("type");
            expect(action).has.property("payload");
            expect(action.type).to.be.equal(DELETE);
            expect(action.payload).to.be.a(typeof Function);
        });
    });
});