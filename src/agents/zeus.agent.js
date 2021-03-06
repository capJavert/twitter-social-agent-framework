const TwitterAgent = require('./twitter.agent');
const Helpers = require('../helpers/helpers');

/**
 * Zeus agent, concrete implementation of TwitterAgent
 *
 * @param username
 * @param password
 * @constructor
 */
function Zeus(username, password) {
    TwitterAgent.call(this, username, password);
}

Zeus.prototype = Object.create(TwitterAgent.prototype);
Zeus.prototype.constructor = Zeus;

/**
 * Behavior for Zeus agent
 *
 * @returns {Promise.<void>}
 */
Zeus.prototype.runBehavior = async function () {
    await this.login();

    await this.notify("foi_hera", {"event": "hello", "username": this.username});

    for (let interest of await this.interests()) {
        await this.followInterests(interest);

        if (Math.random() > 0.7) {
            await this.unfollow(interest);

            try {
                await this.notify("foi_hera", {"event": "unfollowed", "username": interest});
            } catch (e) {
                console.log("Agent not found");
            }

        } else {
            await this.follow((interest));

            try {
                await this.notify("foi_hera", {"event": "followed", "username": interest});
            } catch (e) {
                console.log("Agent not found");
            }
        }

        if (Math.random() > 0.5) {
            await this.tweet(await Helpers.getQuote());

            try {
                await this.notify("foi_hera", {"event": "tweeted", "username": this.username});
            } catch (e) {
                console.log("Agent not found");
            }
        }

        if (Math.random() > 0.5) {
            let tweetId = await this.retweetLastTweet(interest);

            try {
                await this.notify("foi_hera", {"event": "retweeted", "username": interest, "tweetId": tweetId});
            } catch (e) {
                console.log("Agent not found");
            }
        }

        if (Math.random() > 0.8) {
            let tweetId = await this.likeLastTweet(interest);

            try {
                await this.notify("foi_hera", {"event": "liked", "username": interest, "tweetId": tweetId});
            } catch (e) {
                console.log("Agent not found");
            }
        }

        await Helpers.sleep(5000)
    }

    await this.logout();
};

module.exports = Zeus;