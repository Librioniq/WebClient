import {expect} from 'chai';
import * as request from 'superagent';
import * as Server from '../../../main/server';


describe("Routes", function() {
    const url = "http://localhost:8082"


    before(done => {
        Server.run();
        done();
    });

    describe("Questions API", function() {

        it("should respond", function() {
            expect(false).to.be.equals(true);

            request(url).
                .put('/api/profiles/vgheri')
                .send(body)
                .expect('Content-Type', /json/)
                .expect(200) //Status code
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    // Should.js fluent syntax applied
                    res.body.should.have.property('_id');
                    res.body.firstName.should.equal('JP');
                    res.body.lastName.should.equal('Berd');
                    res.body.creationDate.should.not.equal(null);
                    done();
                });
        });
    });

});
});