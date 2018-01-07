const User = require('./user');

class Twitter {
    constructor(page, data, username, password) {
        this.page = page;
        this.data = data;
        this.username = username;
        this.password = password;

        this.page.on('dialog', async dialog => {
            await dialog.defaultValue()
        });
    }

    async login() {
        try {
            await this.page.goto(this.data.baseurl+"/login", {waitUntil: 'networkidle'});

            if(this.data.session === null) {
                await this.page.waitForSelector('button.submit');

                await this.page.focus(".js-username-field");
                await this.page.type(this.username);
                await this.page.focus('.js-password-field');
                await this.page.type(this.password);
                await this.page.click('button.submit');

                console.log("Submit clicked");

                await this.page.waitForSelector('.dashboard-left');

                console.log("Logged in");
            } else {
                await this.page.evaluate(session => {
                    for (let key in session) {
                        if (session.hasOwnProperty(key)) {
                            sessionStorage.setItem(key, JSON.stringify(session[key]));
                        }
                    }
                }, this.data.session);

                console.log("Logged from session");
            }

            return true;
        } catch(e) {
            console.log(e);

            return false;
        }

    }

    async logout() {
        try {
            await this.page.goto(this.data.baseurl+"/logout", {waitUntil: 'networkidle'});

            await this.page.waitForSelector('button.js-submit');
            await this.page.click("button.js-submit");

            await this.page.waitForNavigation();

            console.log("Logged out");

            return true;
        } catch(e) {
            console.log(e);

            return false;
        }
    }

    user() {
        return new User(this.page, this.data);
    }

}

module.exports = Twitter;