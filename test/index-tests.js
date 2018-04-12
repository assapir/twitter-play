'use strict';

process.env.NODE_ENV = `test`;

const request = require(`supertest`),
    expect = require(`chai`).expect,
    app = require(`../lib/index`);

describe(`Express tests`, function() {
    describe(`GET tests`, function() {
        it(`Will return 200 on /`, function(done){
            request(app)
            .get(`/`)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.text).to.equal(`Hello World`);
                done();
            });
        });
        it(`Will retun 404 on not found`, function(done){
            request(app)
            .get(`/blabla`)
            .expect(200)
            .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.text).to.equal(`/blabla Not found!`);
                done();
            });
        });
    });
});
