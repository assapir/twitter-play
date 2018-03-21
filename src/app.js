import Twit from 'twit';
import fs from 'fs';
import {promisify} from 'util';

async function getTokens() {
    const readFile = promisify(fs.readFile);
    try {
        const content = await readFile(`cred.json`, `utf8`);
        return JSON.parse(content);
    } catch (error) {
        console.log(error);
    }
}

async function getResult(params) {
    const twit_instance = new Twit(await getTokens());
    return await twit_instance.get(`statuses/user_timeline`, params);
}

let exp = {};
exp.defaultParams = {
    screen_name: `meijin007`,
    count: 200,
    exclude_replies: true
};

exp.getTweets = async function (params) {
    if (params === undefined)
        params = exp.defaultParams;

    try {
        const result = await getResult(params);
        if (result.resp.statusCode !== 200)
            throw new Error(`Well... ${result.resp.statusMessage}`);

        let mostFavTweet = 0;
        let maxFav = 0;
        result.data.forEach(element => {
            if (element.favorite_count > maxFav) {
                maxFav = element.favorite_count;
                mostFavTweet = element;
            }
        });
        console.log(`Most favorite tweet:\n"${mostFavTweet.text}" \nFavorite count: ${maxFav}`);
    } catch (error) {
        console.log(error);
    }
};

export default exp;