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

    get errorNotification() {
        return $('.woocommerce-error');
    }

    get goToPaymentButton() {
        return $('=ПЕРЕЙТИ К ОПЛАТЕ');
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

    get removePromoCodeLink() {
        return $('.woocommerce-remove-coupon');
    }

    get removeProductLink() {
        return $('.product-remove > a');
    }

    get restoreProductLink() {
        return $('.restore-item');
    }

    get waiter() {
        return $('.blockUI');
    }

    async clickBackToShopButton() {
        await this.backToShopButton.click()
    }

    async clickGoToPaymentButton() {
        await this.goToPaymentButton.click()
    }

    async expectErrorIsDisplayed() {
        await expect(this.errorNotification).toHaveTextContaining("Неверный купон.")
    }

    async expectCartIsNotEmpty() {
        await this.product.waitForExist({interval: 4000, timeoutMsg: "Problem with bring back product"})
        await expect(this.product).toBeDisplayed()
    }

    async expectCartEmptyTextIsDisplayed() {
        await expect(this.cartEmptyText).toBeDisplayed()
        await expect(this.cartEmptyText).toHaveText("Корзина пуста.")
    }

    async expectOrderAmountIsEqualTo(orderAmountWithoutDiscount) {
        await expect(await this.getOrderAmount()).toEqual(orderAmountWithoutDiscount)
    }

    async expectPageTitleIsDisplayed() {
        await expect(this.pageTitle).toBeDisplayed();
    }

    async expectProductTotalPriceTwoTimesHigher(productPrice) {
        const productTotalPrice = await this.productTotalPrice.getText()
        await expect(parseFloat(productTotalPrice.replace(",", ".").replace("₽", "")))
            .toEqual(productPrice * 2)
    }

    async expectTotalAmountReduceForTenPercent(orderAmount) {
        const currentTotalAmount = await this.getOrderAmount()
        console.log(currentTotalAmount)
        console.log(typeof (currentTotalAmount))
        console.log(orderAmount - (orderAmount / 10))
        console.log(typeof (orderAmount))
        await expect(currentTotalAmount).toEqual(orderAmount - (orderAmount / 10))
    }

    async getOrderAmount() {
        const amount = await this.orderTotalAmount.getText()
        return parseFloat(amount.replace(",", ".").replace("₽", ""))
    }

    async getProductPrice() {
        const price = await this.productPrice.getText()
        return parseFloat(price.replace(",", ".").replace("₽", ""))
    }

    async increaseProductQuantity() {
        await this.productQuantity.clearValue()
        await this.productQuantity.addValue("2")
    }

    async inputAndApplyPromoCode(promoCode) {
        await this.inputPromoCodeField.clearValue()
        await this.inputPromoCodeField.addValue(promoCode)
        await this.applyPromoCodeButton.click()
        await this.waiter.waitForExist({timeout: 4000, interval: 500, reverse: true})
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
        await this.waiter.waitForExist({
            timeout: 4000,
            timeoutMsg: "Problem with product removing! (BlockUI is not exist)"
        })
        await this.waiter.waitForExist({timeout: 4000, reverse: true, timeoutMsg: "Problem with product removing!"})
    }

    async removePromoCode() {
        await this.removePromoCodeLink.click()
        await this.waiter.waitForExist({
            timeout: 4000,
            timeoutMsg: "Problem with promo code removing! (BlockUI is not exist)"
        })
        await this.waiter.waitForExist({timeout: 4000, reverse: true, timeoutMsg: "Problem with promo code removing"})
    }

    async restoreProductInCart() {
        // await this.restoreProductLink.waitUntil(async function () { // custom wait for page scrolling stop
        //   let yPositionCurrent = 0
        //   while (true) {
        //     const coordination = await this.getLocation()
        //     const yPositionNew = coordination.y
        //     if (yPositionNew === yPositionCurrent) return true
        //     else yPositionCurrent = yPositionNew
        //   }
        // }, {timeout: 4000, timeoutMsg: "Problem with page scrolling"})
        await this.restoreProductLink.click()
    }
}

module.exports = new CartPage();
