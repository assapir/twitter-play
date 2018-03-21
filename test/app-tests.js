'use strict';

const assert = require("assert");
const app = require('../lib/app');
const eee = require('twit');

let backup = eee.prototype.get;
eee.prototype.get = function(){
    console.log("get was called!");
    return backup(arguments);
};

app.getTweets();

describe('GetTweets', () => {
    it('Method exported', () => {
        assert.equal(typeof app, 'object');
        assert.equal(typeof app.getTweets, 'function');
    });
});