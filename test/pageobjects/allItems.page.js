const Page = require('./page');

class AllItemsPage extends Page {

    get pageTitle() {
        return $('h1=Все товары');
    }

    open() {
        return super.open('shop/');
    }

    async expectPageTitleIsDisplayed () {
        await expect(this.pageTitle).toBeDisplayed()
    }
}

module.exports = new AllItemsPage();
