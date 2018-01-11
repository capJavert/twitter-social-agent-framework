const puppeteer = require('puppeteer');
const Twitter = require('./twitter/twitter');
const DevicesProfiles = require('./devices.profiles');

const appRouter = function (app) {
    puppeteer.launch({headless: true, timeout: 0}).then(async browser => {
        const page = await browser.newPage();
        page.emulate(DevicesProfiles.desktop);

        const twitter = await new Twitter(page);

        app.get("/", function (req, res) {
            res.send("NodeJS Twitter API");
        });

        app.post("/follow/:username", async function(request, response) {
            if(!request.params.username) {
                return response.send({"status": "error", "message": "missing a parameter: username"});
            } else {
                return response.send(await twitter.user().follow(request.params.username));
            }
        });

        app.post("/unfollow/:username", async function(request, response) {
            if(!request.params.username) {
                return response.send({"status": "error", "message": "missing a parameter: username"});
            } else {
                return response.send(await twitter.user().unfollow(request.params.username));
            }
        });

        app.post("/tweet", async function(request, response) {
            if(!request.body.text) {
                return response.send({"status": "error", "message": "missing a parameter: text"});
            } else {
                return response.send(await twitter.user().tweet(request.body.text));
            }
        });

        app.post("/like-recent-tweets/:username", async function(request, response) {
            if(!request.params.username) {
                return response.send({"status": "error", "message": "missing a parameter: username"});
            } else {
                return response.send(await twitter.user().likeRecentTweets(request.params.username));
            }
        });

        app.post("/like-tweet/:username/status/:id", async function(request, response) {
            if(!request.params.username || !request.params.id) {
                return response.send({"status": "error", "message": "missing a parameters: username or status id"});
            } else {
                return response.send(await twitter.user().like(request.params.username, request.params.id));
            }
        });

        app.post("/like-last-tweet/:username", async function(request, response) {
            if(!request.params.username) {
                return response.send({"status": "error", "message": "missing a parameter: username"});
            } else {
                return response.send(await twitter.user().likeLastTweet(request.params.username));
            }
        });

        app.post("/follow-network/:username", async function(request, response) {
            if(!request.params.username) {
                return response.send({"status": "error", "message": "missing a parameter: username"});
            } else {
                return response.send(await twitter.user().followNetwork(request.params.username));
            }
        });

        app.post("/follow-interests/:username", async function(request, response) {
            if(!request.params.username) {
                return response.send({"status": "error", "message": "missing a parameter: username"});
            } else {
                return response.send(await twitter.user().followInterests(request.params.username));
            }
        });

        app.get("/followers/:username", async function(request, response) {
            if(!request.params.username) {
                return response.send({"status": "error", "message": "missing a parameter: username"});
            } else {
                return response.send(await twitter.user().followers(request.params.username));
            }
        });

        app.get("/interests/:username", async function(request, response) {
            if(!request.params.username) {
                return response.send({"status": "error", "message": "missing a parameter: username"});
            } else {
                return response.send(await twitter.user().interests(request.params.username));
            }
        });

        app.post("/retweet/:username/status/:id", async function(request, response) {
            if(!request.params.username || !request.params.id) {
                return response.send({"status": "error", "message": "missing a parameters: username or status id"});
            } else {
                return response.send(await twitter.user().retweet(request.params.username, request.params.id));
            }
        });

        app.post("/retweet-last/:username", async function(request, response) {
            if(!request.params.username) {
                return response.send({"status": "error", "message": "missing a parameter: username"});
            } else {
                return response.send(await twitter.user().retweetLastTweet(request.params.username));
            }
        });

        app.post("/login", async function (request, response) {
            if(!request.body.username || !request.body.password) {
                return response.send({"status": "error", "message": "missing a parameters: username or password"});
            } else {
                return response.send(await twitter.login(request.body.username, request.body.password));
            }
        });

        app.get("/logout", async function (request, response) {
            return response.send(await twitter.logout());
        });
    });
};

module.exports = appRouter;