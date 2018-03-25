'use strict';

const expect   = require(`chai`).expect,
      app = require(`../lib/app`).default;

describe(`Module export`, () => {
    it(`Things are exported`, () => {
        expect(app).to.be.a(`object`);
        expect(app.getTweets).to.be.a(`function`);
        expect(app.defaultParams).to.be.a(`object`);
    });
});

