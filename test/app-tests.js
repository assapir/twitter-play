'use strict';

const sinon = require(`sinon`),
    expect = require(`chai`).expect,
    app = require(`../lib/app`).exp;

describe(`Module tests`, function() {
    describe(`Module export`, function() {
        it(`Things are exported`, function() {
            expect(app).to.be.an(`object`);
            expect(app.getTweets).to.be.a(`function`);
            expect(app.defaultParams).to.be.an(`object`);
        });
        it(`Not responed to unexported function`, function() {
            expect(app).itself.to.respondTo(`getTweets`).
                but.not.respondTo(`getTokens`).
                and.not.respondTo(`getResult`);
        });
    });

    describe(`getTweets function`, function() {
        it(`Pass default parameters to getReault`, async function() {
            const mock = sinon.mock(app.t);
            mock.expects(`getResult`).once().withExactArgs(app.defaultParams).returns({});
            await app.getTweets();
            mock.verify();
        });
        it(`Pass passed parameters to getResult`, async function() {
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
        it(`Throws on statusCode !== 200`, async function() {
            const mock = sinon.mock(app.t);
            const response = {
                resp: {
                    statusCode: 404,
                    statusMessage: `Error`,
                },
            };
            mock.expects(`getResult`).once().withExactArgs(app.defaultParams).returns(response);
            const err = await app.getTweets();
            expect(err).to.be.an.instanceOf(Error);
            expect(err.message).to.be.equal(`Well... ${response.resp.statusMessage}`);
            mock.verify();
        });
        it(`Return most fav on statusCode === 200`, async function() {
            const mock = sinon.mock(app.t);
            const tweetElement = {
                favorite_count: 5,
                text: `5`,
            };

            const response = {
                resp: {
                    statusCode: 200,
                },
                data: [{
                    favorite_count: 1,
                    text: `1`,
                },
                    tweetElement,
                {
                    favorite_count: 2,
                    text: `2`,
                },
                ],
            };
            mock.expects(`getResult`).once().returns(response);
            const ret = await app.getTweets();
            mock.verify();
            expect(ret).to.be.an(`object`);
            expect(ret.maxFav).to.be.equal(5);
            expect(ret.mostFavTweet).to.deep.equal(tweetElement);
        });
    });
});
