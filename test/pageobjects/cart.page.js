const Page = require('./page');

class CartPage extends Page {
  get applyPromoCodeButton() {
    return $('.coupon > .button');
  }

  get backToShopButton() {
    return $('.button.wc-backward');
  }

  get cartEmptyText() {
    return $('.cart-empty');
  }

  get inputPromoCodeField() {
    return $('#coupon_code');
  }

  get orderTotalAmount() {
    return $('.order-total bdi');
  }

  get pageTitle() {
    return $('//*[@id="accesspress-breadcrumb"]//*[text()="Корзина"]');
  }

  get product() {
    return $('.cart_item');
  }

  get productPrice() {
    return $('.product-price bdi');
  }

  get productTotalPrice() {
    return $('.product-subtotal bdi');
  }

  get productQuantity() {
    return $('.product-quantity .qty');
  }

  get refreshCartButton() {
    return $('.actions > .button');
  }

  get removeProductLink() {
    return $('.product-remove > a');
  }

  get restoreProductLink() {
    return $('.restore-item');
  }

  get waiter() {
    return $('.blockOverlay');
  }

  async clickBackToShopButton() {
    await this.backToShopButton.click()
  }

  async expectCartIsNotEmpty() {
    await this.product.waitForExist({interval: 4000, timeoutMsg: "Problem with bring back product"})
    await expect(this.product).toBeDisplayed()
  }

  async expectCartEmptyTextIsDisplayed() {
    await expect(this.cartEmptyText).toBeDisplayed()
    await expect(this.cartEmptyText).toHaveText("Корзина пуста.")
  }

  async expectPageTitleIsDisplayed() {
    await expect(this.pageTitle).toBeDisplayed();
  }

  async expectProductTotalPriceTwoTimesHigher(productPrice) {
    const productTotalPrice = await this.productTotalPrice.getText()
    await expect(parseInt(productTotalPrice.replace(",00₽","")))
        .toEqual(productPrice * 2)
  }

  async getProductPrice() {
    const price = await this.productPrice.getText()
    return parseInt(price.replace(",00₽", ""))
  }

  async increaseProductQuantity() {
    await this.productQuantity.clearValue()
    await this.productQuantity.addValue("2")
  }

  open() {
    return super.open('cart/');
  }

  async refreshCart() {
    await this.refreshCartButton.click()
    await this.waiter.waitForExist({timeout: 4000, reverse: true, timeoutMsg: "Problem with cart refresh!"})
  }

  async removeProductFromCart() {
    await this.removeProductLink.click()
    await this.waiter.waitForExist({timeout: 4000, reverse: true, timeoutMsg: "Problem with cart refresh!"})
  }

  async restoreProductInCart() {
    await browser.pause(2000) //TODO improve this shit
    await this.restoreProductLink.click()
  }
}

module.exports = new CartPage();
