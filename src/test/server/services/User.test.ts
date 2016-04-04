/// <reference path='../../../../typings/main.d.ts'/>
import {expect} from 'chai';
import {clear} from '../../../main/server/database';
import {dbInit} from '../../../main/server/utils/dbInit';
import {User} from '../../../main/server/services';



describe("Services", function() {
    const userService = new User();

    before(dbInit);

    after(clear);

    describe("User Service", function() {
        it("should find user by id", () => {
            const user = userService.findOne(1);

            expect(user).to.be.not.empty;
            expect(user).to.be.deep.equal({
                id: 1,
                firstName: "Oleh",
                lastName: "Dokuka",
                avatar: "/images/test.png"
            });
        });

        it("should find user by login", () => {
            const user = userService.findOne("admin");

            expect(user).to.be.not.empty;
            expect(user).to.be.deep.equal({
                id: 1,
                firstName: "Oleh",
                lastName: "Dokuka",
                avatar: "/images/test.png"
            });
        });

        it("should find user by login and password", () => {
            const user = userService.findOne("admin", "admin");

            expect(user).to.be.not.empty;
            expect(user).to.be.deep.equal({
                id: 1,
                firstName: "Oleh",
                lastName: "Dokuka",
                avatar: "/images/test.png"
            });
        });
    });
});
