'use strict';

const request = require(`supertest`),
    expect = require(`chai`).expect,
    logger = require(`../lib/logger`).logger,
    app = require(`../lib/index`);

before(function() {
    for (const transport of logger.transports)
        transport.silent = true;
});

describe(`Express tests`, function() {
    describe(`GET tests`, function() {
        it(`Will retun 200 on /`, function(done){
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

after(function() {
    for (const transport of logger.transports)
        transport.silent = true;
});