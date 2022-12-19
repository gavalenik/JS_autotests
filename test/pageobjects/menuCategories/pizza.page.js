const Page = require('../page');

class PizzaPage extends Page {
    get pageTitle() {
        return $('h1=Пицца');
    }

    get pageTitleMock() {
        return $('.test-class');
    }

    async expectPageTitleIsDisplayed() {
        await expect(this.pageTitle).toBeDisplayed();
    }

    async expectPageTitleFromMock(text) {
        await expect(this.pageTitleMock).toBeDisplayed();
        await expect(this.pageTitleMock).toHaveText(text, { ignoreCase: true });
    }

    open() {
        return super.open('product-category/menu/pizza/');
    }
}

module.exports = new PizzaPage();