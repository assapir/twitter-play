'use strict';

const assert = require("assert");
const app = require('../lib/app');

describe('GetTweets', () => {
    it('Method exported', () => {
        assert.equal(typeof app, 'object');
        assert.equal(typeof app.getTweets, 'function');
    });
});