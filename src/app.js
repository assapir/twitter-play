'use strict';

function getTokens() {
    const fs = require('fs');
    try {
        const content = fs.readFileSync('cred.json', 'utf8');
        return JSON.parse(content);
    } catch (error) {
        console.log(error);
    }
}

const Twit = require('twit');
const twit_instance = new Twit(getTokens());

async function getTweets(params) {
    let result = await twit_instance.get('statuses/user_timeline', params);
    try {
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

}

const firstParams = {
    screen_name: 'meijin007',
    count: 200,
    exclude_replies: true
};

getTweets(firstParams);