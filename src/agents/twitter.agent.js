const eve = require('evejs');

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

TwitterAgent.prototype.receive = function (from, message) {
    console.log(from, message);

    try {
        let parsedMessage = JSON.parse(message);

        this.onEvent(parsedMessage)
    } catch (e) {
        console.log(from, message)
    }
};

TwitterAgent.prototype.notify = async function (from, message) {
    this.send(from, JSON.stringify(message));
};

TwitterAgent.prototype.login = async function () {
    return await this.twitter.login(this.username, this.password);
};

TwitterAgent.prototype.follow = async function (username) {
    if (this.twitter.data.session !== null) {
        return await this.twitter.user().follow(username)
    } else {
        return false;
    }
};

TwitterAgent.prototype.unfollow = async function (username) {
    if (this.twitter.data.session !== null) {
        return await this.twitter.user().unfollow(username)
    } else {
        return false;
    }
};

TwitterAgent.prototype.tweet = async function (text) {
    if (this.twitter.data.session !== null) {
        return await this.twitter.user().tweet(text)
    } else {
        return false;
    }
};

TwitterAgent.prototype.followInterests = async function (username) {
    if (this.twitter.data.session !== null) {
        return await this.twitter.user().followInterests(username)
    } else {
        return false;
    }
};

TwitterAgent.prototype.followNetwork = async function (username) {
    if (this.twitter.data.session !== null) {
        return await this.twitter.user().followNetwork(username)
    } else {
        return false;
    }
};

TwitterAgent.prototype.like = async function (username, tweetId) {
    if (this.twitter.data.session !== null) {
        return await this.twitter.user().like(username, tweetId)
    } else {
        return false;
    }
};

TwitterAgent.prototype.likeLastTweet = async function (username) {
    if (this.twitter.data.session !== null) {
        return await this.twitter.user().likeLastTweet(username)
    } else {
        return false;
    }
};

TwitterAgent.prototype.likeRecentTweets = async function (username) {
    if (this.twitter.data.session !== null) {
        return await this.twitter.user().likeRecentTweets(username)
    } else {
        return false;
    }
};

TwitterAgent.prototype.followers = async function () {
    if (this.twitter.data.session !== null) {
        return await this.twitter.user().followers(this.username)
    } else {
        return false;
    }
};

TwitterAgent.prototype.interests = async function () {
    if (this.twitter.data.session !== null) {
        return await this.twitter.user().interests(this.username)
    } else {
        return false;
    }
};

TwitterAgent.prototype.logout = async function () {
    if (this.twitter.data.session !== null) {
        await this.twitter.logout();
        this.twitter.data.session = null;
    }

    return true;
};

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