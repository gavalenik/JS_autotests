const Page = require('../page');

class CatalogPage extends Page {
  get pageTitle() {
    return $('h1=Каталог');
  }

  async expectPageTitleIsDisplayed() {
    await expect(this.pageTitle).toBeDisplayed();
  }

  open() {
    return super.open('product-category/catalog/');
  }
}

module.exports = new CatalogPage();
