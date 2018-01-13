const TwitterAgent = require('./twitter.agent');
const Helpers = require('../helpers/helpers');

/**
 * Hera agent, concrete implementation of TwitterAgent
 *
 * @param username
 * @param password
 * @constructor
 */
function Hera(username, password) {
    TwitterAgent.call(this, username, password);
}

Hera.prototype = Object.create(TwitterAgent.prototype);
Hera.prototype.constructor = Hera;

/**
 * Response behavior for Hera agent
 *
 * @returns {Promise.<void>}
 */
Hera.prototype.onEvent = async function (parsedMessage) {
    if (this.twitter.data.session === null) {
        await this.login();
    }

    switch (parsedMessage.event) {
        case "hello":
            await this.follow(parsedMessage.username);
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
            break;
        case "retweeted":
            await this.unfollow(parsedMessage.username)
    }
};

module.exports = Hera;