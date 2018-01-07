const $ = require("jquery");

class User {
    constructor(page, data) {
        this.page = page;
        this.data = data;
    }

    async follow(username) {
        try {
            await this.page.goto(this.data.baseurl+"/"+username, {waitUntil: 'networkidle'});

            if (this.page.$('.ProfileNav-list .user-actions.not-following').length) {
                await this.page.waitForSelector('.ProfileNav-list .user-actions .js-follow-btn');
                await this.page.click('.ProfileNav-list .user-actions .js-follow-btn');

                await this.page.waitForNavigation();
            } else {
                console.log("Already Following")
            }

            return true;
        } catch(e) {
            console.log(e);

            return false;
        }
    }
}

module.exports = User;