/// <reference path='../../../../../../typings/main.d.ts'/>

import {expect} from 'chai';
import {mapToCollection} from '../../../../../main/client/redux/modules/utils';

describe("Redux Modules", function() {
    describe("Utils", function() {
        it("mapToCollection should return changed collection", () => {
            const input = [{ id: 0 }, { id: 1 }, { id: 2 }];
            const action = { payload: { filter: val => val.id === 0 } };
            const reducer = () => ({ id: 0, newKey: "hi" });
            const result = mapToCollection(reducer);

            expect(result).to.be.not.undefined;
            expect(result(input, action)).to.be.deep.include.members([{ id: 1 }, { id: 2 }, { id: 0, newKey: "hi" }]);
        });
    });
});