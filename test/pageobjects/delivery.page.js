const Page = require('./page');

class DeliveryPage extends Page {

    get pageTitle() {
        return $('h2=Доставка и оплата');
    }

    open() {
        return super.open('delivery/');
    }

    async expectPageTitleIsDisplayed () {
        await expect(this.pageTitle).toBeDisplayed()
    }
}

module.exports = new DeliveryPage();
