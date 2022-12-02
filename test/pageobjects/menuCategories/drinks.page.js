const Page = require('../page');

class DrinksPage extends Page {
  get pageTitle() {
    return $('h1=Напитки');
  }

  async expectPageTitleIsDisplayed() {
    await expect(this.pageTitle).toBeDisplayed();
  }

  open() {
    return super.open('product-category/menu/drinks/');
  }
}

module.exports = new DrinksPage();
