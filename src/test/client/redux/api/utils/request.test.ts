/// <reference path='../../../../../../typings/main.d.ts'/>

import {expect} from 'chai';
import * as fetch from 'isomorphic-fetch';
import {remove, get, post, put} from '../../../../../../src/main/client/redux/api/utils/request';


describe("Redux Api Utils", () => {
    const inputUrl = "http://localhost:8082/api/post/0/comment/1";

    before(() => {
        const fetchKey = "fetch";

        global[fetchKey] = fetch;
        // global[formDataKey] = () => { console.log("FormData"); };
        // global[blobKey] = () => { console.log("Blob"); };
    });

    describe("Request Uitls", () => {

        it("#get method should return new Request", () => {
            const result = get(inputUrl);

            expect(result).to.be.instanceof(Request);
            expect(result).to.have.property("method").equals("GET");
            expect(result).to.have.property("url").equals(inputUrl);
        });

        it("#remove method should return new Request", () => {
            const result = remove(inputUrl);

            expect(result).to.be.instanceof(Request);
            expect(result).to.have.property("method").equals("DELETE");
            expect(result).to.have.property("url").equals(inputUrl);
        });

        it("#post method should return POST options", () => {
            const result = post();

            expect(result).to.have.property("method").equals("POST");
        });

        it("#remove method should return PUT options", () => {
            const result = put();

            expect(result).to.have.property("method").equals("PUT");
        });
    });
});