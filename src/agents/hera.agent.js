const TwitterAgent = require('./twitter.agent');

function Hera(username, password) {
    TwitterAgent.call(this, username, password);
}

Hera.prototype = Object.create(TwitterAgent.prototype);
Hera.prototype.constructor = Hera;

Hera.prototype.runBehavior = async function () {
    await this.login();

    // TODO add behaviour

    await this.logout();
};

module.exports = Hera;