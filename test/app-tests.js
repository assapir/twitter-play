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
    it(`Have default parameters`, () => {
        sinon.mock(`getResult`).withExactArgs(app.defaultParams).returns({});
        app.getTweets();
    });
});