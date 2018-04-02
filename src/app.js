import Twit from 'twit';
import fs from 'fs';
import { promisify } from 'util';
import { logger } from './logger';

export let exp = {
    t: {},
};

async function getTokens() {
    const readFile = promisify(fs.readFile);
    try {
        const content = await readFile(`cred.json`, `utf8`);
        return JSON.parse(content);
    } catch (error) {
        logger.error(error.message);
        throw error;
    }
}

exp.t.getResult = async function(params) {
    const twit_instance = new Twit(await getTokens());
    return await twit_instance.get(`statuses/user_timeline`, params);
};

exp.defaultParams = {
    screen_name: `meijin007`,
    count: 200,
    exclude_replies: true,
};

exp.getTweets = async function(params) {
    if (params === undefined)
        params = exp.defaultParams;

    try {
        const result = await exp.t.getResult(params);
        if (result.resp.statusCode !== 200)
            throw new Error(`Well... ${result.resp.statusMessage}`);

        const ret = {
            mostFavTweet: {},
            maxFav: 0,
        };
        for (const element of result.data) 
            if (element.favorite_count > ret.maxFav) {
                ret.maxFav = element.favorite_count;
                ret.mostFavTweet = element;
            }
        logger.debug(`Most favorite tweet:\n"${ret.mostFavTweet.text}" \nFavorite count: ${ret.maxFav}`);
        return ret;
    } catch (error) {
        logger.error(error.message);
        return error;
    }
};

if (typeof require !== `undefined` && require.main === module)
    exp.getTweets();
