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
            await this.like(parsedMessage.tweetId);
            break;
        case "tweeted":
            await this.likeLastTweet(parsedMessage.username);
    }

    Helpers.sleep(5000);
};

module.exports = Hera;