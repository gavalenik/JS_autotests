module.exports = class Page {
    async expectUrlIs(url) {
        await expect(await browser.getUrl()).toEqual(url);
    }

    async clickOkInAlertWindow() {
        await browser.acceptAlert()
    }

    async deleteCookies() {
        await browser.deleteCookies()
    }

    open(path) {
        return browser.url(`http://pizzeria.skillbox.cc/${path}`);
    }
};
