const Page = require('./page')

class CheckoutPage extends Page {
  get addressField () {
    return $('#billing_address_1')
  }

  get applyPromoCodeButton () {
    return $('button[value="Применить купон"]')
  }

  get authorizationLink () {
    return $('=Авторизуйтесь')
  }

  get cityField () {
    return $('#billing_city')
  }

  get commentField () {
    return $('#order_comments')
  }

  get countryField () {
    return $('#billing_country')
  }

  get dateOfOrder () {
    return $('#order_date')
  }

  get emailField () {
    return $('#billing_email')
  }

  get errorText () {
    return $('.woocommerce-error > li')
  }

  get firstNameField () {
    return $('#billing_first_name')
  }

  get lastNameField () {
    return $('#billing_last_name')
  }

  get loginButton () {
    return $('button[value="Войти"]')
  }

  get orderAmount () {
    return $('.order-total .woocommerce-Price-amount > bdi')
  }

  get orderIsCompleted () {
    return $('h2=Заказ получен')
  }

  get pageTitle () {
    return $('h2=Доставка и оплата')
  }

  get passwordField () {
    return $('#password')
  }

  get paymentBankTransfer () {
    return $('.payment_method_bacs > label')
  }

  get paymentCashWithDelivery () {
    return $('.payment_method_cod > label')
  }

  get phoneField () {
    return $('#billing_phone')
  }

  get placeOrderButton () {
    return $('#place_order')
  }

  get promoCodeField () {
    return $('#coupon_code')
  }

  get promoCodeLink () {
    return $('=Нажмите для ввода купона')
  }

  get regionField () {
    return $('#billing_state')
  }

  get termsAndConditions () {
    return $('.woocommerce-terms-and-conditions-checkbox-text')
  }

  get usernameField () {
    return $('#username')
  }

  get waiter () {
    return $('.blockUI')
  }

  get postCodeField () {
    return $('#billing_postcode')
  }

  async applyPromoCode (promoCode) {
    await this.promoCodeLink.click()
    await this.promoCodeField.addValue(promoCode)
    await this.applyPromoCodeButton.click()
    await this.waiter.waitForExist()
    await this.waiter.waitForExist({ reverse: true })
  }

  async choosePaymentBankTransfer () {
    await this.paymentBankTransfer.click()
  }

  async choosePaymentCashWithDelivery () {
    await this.paymentCashWithDelivery.click()
  }

  async clearPostCodeValue () {
    await this.postCodeField.clearValue()
  }

  async clickAuthorizationLink () {
    await this.authorizationLink.click()
  }

  async clickCheckBoxTermsAndConditions () {
    await this.termsAndConditions.click()
  }

  async clickLoginButton () {
    await this.loginButton.waitForClickable()
    await this.loginButton.click()
  }

  async clickPlaceOrderButton () {
    await this.placeOrderButton.click()
    await this.waiter.waitForExist({ timeout: 7000, reverse: true })
  }

  async expectCheckoutDetailsPageDisplayed () {
    await expect(this.placeOrderButton).toBeDisplayed()
  }

  async expectErrorTextContainsText (errorText) {
    await expect(this.errorText).toHaveTextContaining(errorText)
  }

  async expectOrderAmountIs10PercentLess (orderAmountBeforeDiscount) {
    const newOrderAmount = await this.getOrderAmount()
    await expect(newOrderAmount).toEqual(orderAmountBeforeDiscount - orderAmountBeforeDiscount / 10)
  }

  async expectOrderIsAccepted () {
    await this.orderIsCompleted.waitForDisplayed()
  }

  async expectPageTitleIsDisplayed () {
    await expect(this.pageTitle).toBeDisplayed()
  }

  async getOrderAmount () {
    const elem = await this.orderAmount
    const elemText = (await elem.getText()).replace(',', '.').replace('₽', '')
    return parseFloat(elemText)
  }

  async inputAddress (address) {
    await this.addressField.clearValue()
    await this.addressField.addValue(address)
  }

  async inputCity (city) {
    await this.cityField.clearValue()
    await this.cityField.addValue(city)
  }

  async inputComment (comment) {
    await this.commentField.clearValue()
    await this.commentField.addValue(comment)
  }

  async inputDateOfOrder (date) {
    await this.dateOfOrder.clearValue()
    await this.dateOfOrder.addValue(date)
  }

  async inputEmail (email) {
    await this.emailField.clearValue()
    await this.emailField.addValue(email)
  }

  async inputFirstName (firstName) {
    await this.firstNameField.clearValue()
    await this.firstNameField.addValue(firstName)
  }

  async inputLastName (lastName) {
    await this.lastNameField.clearValue()
    await this.lastNameField.addValue(lastName)
  }

  async inputPhoneNumber (phoneNumber) {
    await this.phoneField.clearValue()
    await this.phoneField.addValue(phoneNumber)
  }

  async inputPostCode (postCode) {
    await this.postCodeField.clearValue()
    await this.postCodeField.addValue(postCode)
    await this.waiter.waitForExist()
    await this.waiter.waitForExist({ timeout: 7000, reverse: true })
  }

  async inputRegionViaDropdown (region) {
    await this.regionField.selectByVisibleText(region)
  }

  async inputUsername (username) {
    await this.usernameField.addValue(username)
  }

  async inputPassword (password) {
    await this.passwordField.addValue(password)
  }

  open () {
    return super.open('checkout/')
  }

  async selectCountry (country) {
    await this.countryField.selectByVisibleText(country)
    await this.waiter.waitForExist()
    await this.waiter.waitForExist({ timeout: 7000, reverse: true })
  }
}

module.exports = new CheckoutPage()
