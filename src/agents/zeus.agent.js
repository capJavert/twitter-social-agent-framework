const TwitterAgent = require('./twitter.agent');

function Zeus(username, password) {
    TwitterAgent.call(this, username, password);
}

Zeus.prototype = Object.create(TwitterAgent.prototype);
Zeus.prototype.constructor = Zeus;

Zeus.prototype.runBehavior = async function () {
    await this.login();

    // TODO add behaviour

    await this.logout();
};

module.exports = Zeus;