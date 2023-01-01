const MainPage = require('../pageobjects/main.page')
const CartPage = require('../pageobjects/cart.page')
const CheckoutPage = require('../pageobjects/checkout.page')
const RegisterPage = require('../pageobjects/register.page')

class Helper {
  orderData = {
    firstName: 'Billy',
    lastName: 'Smith',
    country: 'Mexico',
    address: '3 Poco street',
    city: 'Cancun',
    region: 'Yucatán',
    postalCode: '123123',
    phoneNumber: '89201234567',
    email: 'js_auto2@test.ru'
  }

  promoCode = 'GIVEMEHALYAVA'

  user1 = {
    name: 'Bill',
    email: 'js_auto@test.ru',
    password: 'qwerty1234',
    phone: '+77001234567'
  }

  user2 = {
    name: 'Billy',
    email: 'js_auto2@test.ru',
    password: 'qwerty1234'
  }

  user3 = {
    name: 'Bi',
    email: 'js_auto3@test.ru',
    password: 'qwerty1234'
  }

  async addPizzaToCartAndAuthorization (userName = 'user2') {
    const user = eval(`this.${userName}`)
    await MainPage.open()

    await MainPage.addToBasketPizzaNumber(1)
    await MainPage.clickCartButton()
    await CartPage.clickGoToPaymentButton()
    await CheckoutPage.clickAuthorizationLink()
    await CheckoutPage.inputUsername(user.name)
    await CheckoutPage.inputPassword(user.password)
    await CheckoutPage.clickLoginButton()
    await CheckoutPage.expectCheckoutDetailsPageDisplayed()
  }

  async addPizzaToCartAndPromoCodeApplying () {
    await MainPage.open()

    await MainPage.addToBasketPizzaNumber(1)
    await MainPage.clickCartButton()
    const orderAmountWithoutDiscount = await CartPage.getOrderAmount()
    await CartPage.inputAndApplyPromoCode(this.promoCode)
    return orderAmountWithoutDiscount
  }

  async goToCheckoutPageAndInputUserData () {
    await CartPage.clickGoToPaymentButton()
    await this.inputUserData()
  }

  async inputUserData () {
    await CheckoutPage.inputFirstName(this.orderData.firstName)
    await CheckoutPage.inputLastName(this.orderData.lastName)
    await CheckoutPage.selectCountry(this.orderData.country)
    await CheckoutPage.inputAddress(this.orderData.address)
    await CheckoutPage.inputCity(this.orderData.city)
    await CheckoutPage.inputRegionViaDropdown(this.orderData.region)
    await CheckoutPage.inputPostCode(this.orderData.postalCode)
    await CheckoutPage.inputPhoneNumber(this.orderData.phoneNumber)
    await CheckoutPage.inputEmail(this.orderData.email)
    await CheckoutPage.choosePaymentBankTransfer()
    await CheckoutPage.clickCheckBoxTermsAndConditions()
  }

  async successfulRegistration () {
    const newUser = await this.uniqUserData()
    await RegisterPage.open()

    await RegisterPage.inputUsername(newUser.name)
    await RegisterPage.inputEmail(newUser.email)
    await RegisterPage.inputPassword(newUser.password)
    await RegisterPage.clickRegistrationButton()
    await RegisterPage.expectRegistrationDone()
  }

  async uniqUserData () {
    const unixTime = Math.floor(Date.now() / 1000)
    const randomPart = unixTime.toString().substring(2)
    return { name: 'Bill' + randomPart, email: 'js_' + randomPart + '@test.ru', password: 'qwerty1234' }
  }
}

module.exports = new Helper()
