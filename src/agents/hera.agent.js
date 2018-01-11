const TwitterAgent = require('./twitter.agent');
const Helpers = require('../helpers/helpers');

function Hera(username, password) {
    TwitterAgent.call(this, username, password);
}

Hera.prototype = Object.create(TwitterAgent.prototype);
Hera.prototype.constructor = Hera;

TwitterAgent.prototype.onEvent = async function (parsedMessage) {
    if (this.twitter.data.session === null) {
        await this.login();
    }

    switch (parsedMessage.event) {
        case "hello":
            console.log(await this.follow(parsedMessage.username));
            break;
        case "followed":
            await this.likeLastTweet(parsedMessage.username);
            break;
        case "unfollowed":
            await this.unfollow(parsedMessage.username);
            break;
        case "liked":
            if (Math.random() > 0.6) {
                await this.like(parsedMessage.username, parsedMessage.tweetId);
            } else {
                await this.retweet(parsedMessage.username, parsedMessage.tweetId);
            }
            break;
        case "tweeted":
            if (Math.random() > 0.6) {
                await this.likeLastTweet(parsedMessage.username);
            } else {
                await this.retweetLastTweet(parsedMessage.username);
            }
    }

    Helpers.sleep(5000);
};

module.exports = Hera;