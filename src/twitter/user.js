const Helpers = require('../helpers/helpers');

class User {
    constructor(page, data) {
        this.page = page;
        this.data = data;
    }

    async follow(username) {
        try {
            await this.page.goto(this.data.baseurl+"/"+username, {waitUntil: 'networkidle2'});

            await this.page.waitForSelector('.ProfileNav-list .user-actions .js-follow-btn');

            if (await this.page.$('.ProfileNav-list .user-actions.not-following') !== null) {
                await this.page.waitForSelector('.ProfileNav-list .user-actions .js-follow-btn');
                await this.page.click('.ProfileNav-list .user-actions .js-follow-btn');
            } else {
                console.log("Already Following")
            }

            return true;
        } catch(e) {
            console.log(e);

            return false;
        }
    }

    async unfollow(username) {
        try {
            await this.page.goto(this.data.baseurl+"/"+username, {waitUntil: 'networkidle2'});

            await this.page.waitForSelector('.ProfileNav-list .user-actions .js-follow-btn');

            if (await this.page.$('.ProfileNav-list .user-actions.following') !== null) {
                await this.page.waitForSelector('.ProfileNav-list .user-actions .js-follow-btn');
                await this.page.click('.ProfileNav-list .user-actions .js-follow-btn');
            } else {
                console.log("Not following")
            }

            return true;
        } catch(e) {
            console.log(e);

            return false;
        }
    }

    async tweet(text) {
        try {
            if (!Helpers.urlsEqual(this.page.url(), this.data.baseurl)) {
                await this.page.goto(this.data.baseurl, {waitUntil: 'networkidle2'});
                await this.page.waitForSelector(".js-tweet-btn");
            }

            await this.page.waitForSelector("#tweet-box-home-timeline");
            await this.page.click("#tweet-box-home-timeline");
            await this.page.waitForSelector("#tweet-box-home-timeline.is-showPlaceholder");
            await this.page.type("#tweet-box-home-timeline", text);
            await this.page.waitForSelector(".js-tweet-btn");
            await this.page.click(".js-tweet-btn");

            return true;
        } catch(e) {
            console.log(e);

            return false;
        }
    }

    async likeRecentTweets(username) {
        try {
            await this.page.goto(this.data.baseurl+"/"+username, {waitUntil: 'networkidle2'});

            await this.page.waitForSelector(".ProfileTweet-action--favorite");

            for (let element of await this.page.$$(".ProfileTweet-actionButton.js-actionFavorite")) {
                await element.click();
            }

            return true;
        } catch(e) {
            console.log(e);

            return false;
        }
    }

    async likeLastTweet(username) {
        try {
            await this.page.goto(this.data.baseurl+"/"+username, {waitUntil: 'networkidle2'});

            await this.page.waitForSelector(".ProfileTweet-action--favorite");

            await (await this.page.$(".ProfileTweet-actionButton.js-actionFavorite")).click();

            return true;
        } catch(e) {
            console.log(e);

            return false;
        }
    }

    async followNetwork(username) {
        try {
            await this.page.goto(this.data.baseurl+"/"+username+"/followers", {waitUntil: 'networkidle2'});

            await this.page.waitForSelector(".AppContent-main");

            for (let element of await this.page.$$(".AppContent-main .js-follow-btn")) {
                await element.click()
            }

            return true;
        } catch(e) {
            console.log(e);

            return false;
        }
    }

    async followInterests(username) {
        try {
            await this.page.goto(this.data.baseurl+"/"+username+"/following", {waitUntil: 'networkidle2'});

            await this.page.waitForSelector(".AppContent-main");

            for (let element of await this.page.$$(".AppContent-main .js-follow-btn")) {
                await element.click()
            }

            return true;
        } catch(e) {
            console.log(e);

            return false;
        }
    }

    async followers(username) {
        try {
            await this.page.goto(this.data.baseurl+"/"+username+"/followers", {waitUntil: 'networkidle2'});

            await this.page.waitForSelector(".AppContent-main");

            return await this.page.$$eval(".AppContent-main .username.u-dir .u-linkComplex-target", elements => {
                let followers = [];

                for (let element of elements) {
                    followers.push(element.innerText);
                }
                followers.shift();

                return followers;
            });
        } catch(e) {
            console.log(e);

            return [];
        }
    }

    async interests(username) {
        try {
            await this.page.goto(this.data.baseurl+"/"+username+"/following", {waitUntil: 'networkidle2'});

            await this.page.waitForSelector(".AppContent-main");

            return await this.page.$$eval(".AppContent-main .username.u-dir .u-linkComplex-target", elements => {
                let followers = [];

                for (let element of elements) {
                    followers.push(element.innerText);
                }
                followers.shift();

                return followers;
            });
        } catch(e) {
            console.log(e);

            return [];
        }
    }
}

module.exports = User;
