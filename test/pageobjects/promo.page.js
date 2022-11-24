const Page = require('./page');

class PromoPage extends Page {

    get pageTitle() {
        return $('h2=Акции');
    }

    open() {
        return super.open('promo/');
    }

    async expectPageTitleIsDisplayed () {
        await expect(this.pageTitle).toBeDisplayed()
    }
}

module.exports = new PromoPage();
