const Page = require('../page');

class PizzaPage extends Page {
    get pageTitle() {
        return $('h1=Пицца');
    }

    async expectPageTitleIsDisplayed() {
        await expect(this.pageTitle).toBeDisplayed();
    }

    open() {
        return super.open('product-category/menu/pizza/');
    }
}

module.exports = new PizzaPage();
