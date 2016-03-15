/// <reference path='../../../../../../typings/main.d.ts'/>

import {expect} from 'chai';
import * as Url from '../../../../../../src/main/client/redux/api/utils/Url';

describe("Redux Api Utils", () => {
    const input = "http://localhost:8082/api/post/:postId/comment/:commentId";
    const expected = "http://localhost:8082/api/post/0/comment/1";

    describe(`Url#match should return '${expected}' for input '${input}'`, () => {

        it("and object {commentId: 1, postId: 0}", () => expect(Url.match(input, { commentId: 1, postId: 0 })).to.be.equal(expected));

        it("and array [0, 1]", () => expect(Url.match(input, { commentId: 1, postId: 0 })).to.be.equal(expected));
    });
});