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
}

module.exports = Helpers;
