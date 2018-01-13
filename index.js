const puppeteer = require('puppeteer');
const Twitter = require('./src/twitter/twitter');
const DevicesProfiles = require('./src/devices.profiles');
const Zeus = require('./src/agents/zeus.agent');
const Hera = require('./src/agents/hera.agent');

const headless = true;

(async () => {
    await puppeteer.launch({headless: headless, timeout: 0}).then(async browser => {

        let hera = new Hera('USERNAME', 'PASSWORD');

        let page = await browser.newPage(); await page.emulate(DevicesProfiles.desktop);

        hera.twitter = await new Twitter(page);

        await hera.login();
    });

    await puppeteer.launch({headless: headless, timeout: 0}).then(async browser => {

        let zeus = new Zeus('USERNAME', 'PASSWORD');

        let page = await browser.newPage(); await page.emulate(DevicesProfiles.desktop);
        zeus.twitter = await new Twitter(page);

        await zeus.login();
    });
})();
