const Page = require('./page');

class CartPage extends Page {
  get pageTitle() {
    return $('//*[@id="accesspress-breadcrumb"]//*[text()="Корзина"]');
  }

  open() {
    return super.open('cart/');
  }

  async expectPageTitleIsDisplayed() {
    await expect(this.pageTitle).toBeDisplayed();
  }
}

module.exports = new CartPage();
