const Page = require('./page');

class DeliveryPage extends Page {
    get pageTitle() {
        return $('h2=Доставка и оплата');
    }

    async expectPageContainsText(text) {
        const elem = await $(`//body//li[contains(text(), "${text}")]`)
        await expect(elem).toBeDisplayed()
    }

    async expectPageTitleIsDisplayed() {
        await expect(this.pageTitle).toBeDisplayed()
    }

    open() {
        return super.open('delivery/');
    }

    async switchToIframe() {
        await browser.switchToFrame(await $('iframe'))
    }
}

module.exports = new DeliveryPage();
