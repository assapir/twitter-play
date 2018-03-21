'use strict';

require(`babel-polyfill`); // need for babel app

const assert = require(`assert`);
const app = require(`../lib/app`).default;

describe(`Module export`, () => {
    it(`Things are exported`, () => {
        assert.equal(typeof app, `object`);
        assert.equal(typeof app.getTweets, `function`);
        assert.equal(typeof app.defaultParams, `object`);
    });
});