const Page = require('./page');

class CheckoutPage extends Page {
    get addressField() {
        return $('#billing_address_1');
    }

    get applyPromoCodeButton() {
        return $('button[value="Применить купон"]');
    }

    get authorizationLink() {
        return $('=Авторизуйтесь');
    }

    get cityField() {
        return $('#billing_city');
    }

    get firstNameField() {
        return $('#billing_first_name');
    }

    get lastNameField() {
        return $('#billing_last_name');
    }

    get loginButton() {
        return $('button[value="Войти"]');
    }

    get orderAmount() {
        return $('.order-total .woocommerce-Price-amount > bdi');
    }

    get pageTitle() {
        return $('h2=Доставка и оплата');
    }

    get passwordField() {
        return $('#password');
    }

    get paymentBankTransfer() {
        return $('label=Прямой банковский перевод');
    }

    get paymentCashWithDelivery() {
        return $('label=Оплата при доставке');
    }

    get phoneField() {
        return $('#billing_phone');
    }

    get placeOrderButton() {
        return $('#place_order');
    }

    get promoCodeField() {
        return $('#coupon_code');
    }

    get promoCodeLink() {
        return $('=Нажмите для ввода купона');
    }

    get regionField() {
        return $('#billing_state');
    }

    get termsAndConditions() {
        return $('.woocommerce-terms-and-conditions-checkbox-text');
    }

    get usernameField() {
        return $('#username');
    }

    get waiter() {
        return $('.blockUI');
    }

    get zipField() {
        return $('#billing_postcode');
    }

    async clickAuthorizationLink() {
        await this.authorizationLink.click()
    }

    async clickLoginButton() {
        await this.loginButton.click()
    }

    async applyPromoCode(promoCode) {
        await this.promoCodeLink.click()
        await this.promoCodeField.addValue(promoCode)
        await this.applyPromoCodeButton.click()
        await this.waiter.waitForExist({timeout: 4000})
        await this.waiter.waitForExist({timeout: 4000, reverse: true})
    }

    async expectCheckoutDetailsPageDisplayed() {
        await expect(this.placeOrderButton).toBeDisplayed()
    }

    async expectOrderAmountIs10PercentLess(orderAmountBeforeDiscount) {
        const newOrderAmount = await this.getOrderAmount()
        await expect(newOrderAmount).toEqual(orderAmountBeforeDiscount - orderAmountBeforeDiscount / 10)
    }

    async expectPageContainsText(text) {
        const elem = await $(`//body//li[contains(text(), "${text}")]`)
        await expect(elem).toBeDisplayed()
    }

    async expectPageTitleIsDisplayed() {
        await expect(this.pageTitle).toBeDisplayed()
    }

    async getOrderAmount() {
        const elem = await this.orderAmount
        const elemText = (await elem.getText()).replace(",", ".").replace("₽", "")
        return parseFloat(elemText)
    }

    async inputUsername(username) {
        await this.usernameField.addValue(username)
    }

    async inputPassword(password) {
        await this.passwordField.addValue(password)
    }

    open() {
        return super.open('checkout/');
    }
}

module.exports = new CheckoutPage();
