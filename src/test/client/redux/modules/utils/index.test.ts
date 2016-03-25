/// <reference path='../../../../../../typings/main.d.ts'/>

import {expect} from 'chai';
import {assign} from 'lodash';
import {reduceReducers} from '../../../../../main/client/redux/modules/utils';

describe("Redux Modules", function() {
    // describe("Utils mapToCollection", function() {
    //     const input = [{ id: 0 }, { id: 1 }, { id: 2 }];
    //     const action = { payload: { filter: val => val.id === 0 } };
    //     const reducer = () => ({ id: 0, newKey: "hi" });
    //     const result = mapToCollection(reducer);

    //     it("should return changed collection", () => {
    //         expect(result).to.be.not.undefined;
    //         expect(result(input, action)).to.be.deep.include.members([{ id: 1 }, { id: 2 }, { id: 0, newKey: "hi" }]);
    //     });
    // });
    describe("Utils reduceReducers", function() {
        it("should return new state", () => {
            const expected = { id: 1, name: "Jhon", surnema: "Doe" };
            const result = reduceReducers(
                s => assign(s, { id: 1 }),
                s => assign(s, { name: "Jhon" }),
                s => assign(s, { surnema: "Doe" })
            )({}, {});

            expect(result).to.be.not.undefined;
            expect(result).to.be.deep.equal(expected);
        });
    });
});