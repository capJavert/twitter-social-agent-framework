const TwitterAgent = require('./twitter.agent');
const Helpers = require('../helpers/helpers');

function Zeus(username, password) {
    TwitterAgent.call(this, username, password);
}

Zeus.prototype = Object.create(TwitterAgent.prototype);
Zeus.prototype.constructor = Zeus;

Zeus.prototype.runBehavior = async function () {
    await this.login();

    await this.notify("foi_hera", {"event": "hello", "username": this.username});

    for (let interest of await this.interests()) {
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

        if (Math.random() > 0.95) {
            await this.tweet(await Helpers.getQuote());

            try {
                await this.notify("foi_hera", {"event": "tweeted", "username": this.username});
            } catch (e) {
                console.log("Agent not found");
            }
        }

        await Helpers.sleep(5000)
    }

    await this.logout();
};

module.exports = Zeus;