const eve = require('evejs');

/**
 * Twitter agent, concrete implementation of eve.Agent
 *
 * @param username
 * @param password
 * @constructor
 */
function TwitterAgent(username, password) {
    eve.Agent.call(this, username);

    this.username = username;
    this.password = password;

    this.extend('request');
    this.connect(eve.system.transports.getAll());
}

// extend the eve.Agent prototype
TwitterAgent.prototype = Object.create(eve.Agent.prototype);
TwitterAgent.prototype.constructor = TwitterAgent;

TwitterAgent.prototype.onEvent = async function (parsedMessage) {
    // implement onEvent behaviour
};

/**
 * Receive messages handler
 *
 * @param from
 * @param message
 */
TwitterAgent.prototype.receive = function (from, message) {
    console.log(from, message);

    try {
        let parsedMessage = JSON.parse(message);

        this.onEvent(parsedMessage)
    } catch (e) {
        console.log(from, message)
    }
};

/**
 * Send Event type message to agent
 * @param from
 * @param message
 * @returns {Promise.<void>}
 */
TwitterAgent.prototype.notify = async function (from, message) {
    this.send(from, JSON.stringify(message));
};

/**
 * Login action
 *
 * @returns {Promise.<*>}
 */
TwitterAgent.prototype.login = async function () {
    return await this.twitter.login(this.username, this.password);
};

/**
 * Follow action
 *
 * @param username
 * @returns {Promise.<*>}
 */
TwitterAgent.prototype.follow = async function (username) {
    if (this.twitter.data.session !== null) {
        return await this.twitter.user().follow(username)
    } else {
        return false;
    }
};

/**
 * Unfollow action
 *
 * @param username
 * @returns {Promise.<*>}
 */
TwitterAgent.prototype.unfollow = async function (username) {
    if (this.twitter.data.session !== null) {
        return await this.twitter.user().unfollow(username)
    } else {
        return false;
    }
};

/**
 * Tweet action
 *
 * @param text
 * @returns {Promise.<*>}
 */
TwitterAgent.prototype.tweet = async function (text) {
    if (this.twitter.data.session !== null) {
        return await this.twitter.user().tweet(text)
    } else {
        return false;
    }
};

/**
 * Follow interests action
 *
 * @param username
 * @returns {Promise.<*>}
 */
TwitterAgent.prototype.followInterests = async function (username) {
    if (this.twitter.data.session !== null) {
        return await this.twitter.user().followInterests(username)
    } else {
        return false;
    }
};

/**
 * Follow network action
 *
 * @param username
 * @returns {Promise.<*>}
 */
TwitterAgent.prototype.followNetwork = async function (username) {
    if (this.twitter.data.session !== null) {
        return await this.twitter.user().followNetwork(username)
    } else {
        return false;
    }
};

/**
 * Like action
 *
 * @param username
 * @param tweetId
 * @returns {Promise.<*>}
 */
TwitterAgent.prototype.like = async function (username, tweetId) {
    if (this.twitter.data.session !== null) {
        return await this.twitter.user().like(username, tweetId)
    } else {
        return false;
    }
};

/**
 * Like last tweet action
 *
 * @param username
 * @returns {Promise.<*>}
 */
TwitterAgent.prototype.likeLastTweet = async function (username) {
    if (this.twitter.data.session !== null) {
        return await this.twitter.user().likeLastTweet(username)
    } else {
        return false;
    }
};

/**
 * Like rcent tweets action
 *
 * @param username
 * @returns {Promise.<*>}
 */
TwitterAgent.prototype.likeRecentTweets = async function (username) {
    if (this.twitter.data.session !== null) {
        return await this.twitter.user().likeRecentTweets(username)
    } else {
        return false;
    }
};

/**
 * Get user followers action
 *
 * @returns {Promise.<*>}
 */
TwitterAgent.prototype.followers = async function () {
    if (this.twitter.data.session !== null) {
        return await this.twitter.user().followers(this.username)
    } else {
        return false;
    }
};

/**
 * Get user interests action
 *
 * @returns {Promise.<*>}
 */
TwitterAgent.prototype.interests = async function () {
    if (this.twitter.data.session !== null) {
        return await this.twitter.user().interests(this.username)
    } else {
        return false;
    }
};

/**
 * Logout action
 *
 * @returns {Promise.<boolean>}
 */
TwitterAgent.prototype.logout = async function () {
    if (this.twitter.data.session !== null) {
        await this.twitter.logout();
        this.twitter.data.session = null;
    }

    return true;
};

/**
 * Retweet action
 *
 * @param username
 * @param tweetId
 * @returns {Promise.<*>}
 */
TwitterAgent.prototype.retweet = async function (username, tweetId) {
    if (this.twitter.data.session !== null) {
        return await this.twitter.user().retweet(username, tweetId)
    } else {
        return false;
    }
};

TwitterAgent.prototype.retweetLastTweet = async function (username) {
    if (this.twitter.data.session !== null) {
        return await this.twitter.user().retweetLastTweet(username)
    } else {
        return false;
    }
};

module.exports = TwitterAgent;