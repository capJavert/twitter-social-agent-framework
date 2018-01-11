const request = require('request');

class Helpers {
    static trimLeft(string, charlist) {
        if (charlist === undefined)
            charlist = "\s";

        return string.replace(new RegExp("^[" + charlist + "]+"), "");
    };

    static trimRight(string, charlist) {
        if (charlist === undefined)
            charlist = "\s";

        return string.replace(new RegExp("[" + charlist + "]+$"), "");
    };

    static urlsEqual(url1, url2) {
        return this.trimRight(url1, "/") === this.trimRight(url2, "/");
    }

    static sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    static getQuote() {
        return new Promise(function (resolve, reject) {
            request("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",
                function (error, res, body) {
                    if (!error && res.statusCode === 200) {
                        resolve(Helpers.stripTags(JSON.parse(body)[0].content));
                    } else {
                        reject(error);
                    }
            });
        });
    }

    static stripTags(html){
        return html.replace(/<[^>]+>/g, '')
    }
}

module.exports = Helpers;
