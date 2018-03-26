'use strict';

const sinon = require(`sinon`),
    expect = require(`chai`).expect,
    app = require(`../lib/app`).default;

describe(`Module export`, () => {
    it(`Things are exported`, () => {
        expect(app).to.be.an(`object`);
        expect(app.getTweets).to.be.a(`function`);
        expect(app.defaultParams).to.be.an(`object`);
    });
    it(`Not responed to unexported function`, () => {
        expect(app).itself.to.respondTo(`getTweets`).
            but.not.respondTo(`getTokens`).
            and.not.respondTo(`getResult`);
    });
});

describe(`getTweets function`, () => {
    it(`Pass default parameters to getResault`, async () => {
        const mock = sinon.mock(app.t);
        mock.expects(`getResult`).once().withExactArgs(app.defaultParams).returns({}); 
        await app.getTweets();
        mock.verify();
    });
    it(`Pass passed parameters to getResault`, async () => {
        const mock = sinon.mock(app.t);
        const params = {
            screen_name: `aa`,
            count: 1,
            exclude_replies: false,
        };

        mock.expects(`getResult`).once().withExactArgs(params).returns({}); 
        await app.getTweets(params);
        mock.verify();
    });
});