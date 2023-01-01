const MainPage = require('../../pageobjects/main.page')
const CheckoutPage = require('../../pageobjects/checkout.page')
const TestHelper = require('../testHelper')

describe('Pizzeria. Checkout process validation', () => {
  before(async () => {
    await MainPage.deleteCookies()
    await TestHelper.addPizzaToCartAndAuthorization()
  })

  it('TC01. Checkout page, first name is mandatory', async () => {
    const errorText = 'Имя для выставления счета обязательное поле.'
    await CheckoutPage.open()

    await TestHelper.inputUserData()
    await CheckoutPage.inputFirstName('')
    await CheckoutPage.clickPlaceOrderButton()
    await CheckoutPage.expectErrorTextContainsText(errorText)
  })

  it('TC02. Checkout page, last name is mandatory', async () => {
    const errorText = 'Фамилия для выставления счета обязательное поле.'
    await CheckoutPage.open()

    await TestHelper.inputUserData()
    await CheckoutPage.inputLastName('')
    await CheckoutPage.clickPlaceOrderButton()
    await CheckoutPage.expectErrorTextContainsText(errorText)
  })

  it('TC03. Checkout page, address is mandatory', async () => {
    const errorText = 'Адрес для выставления счета обязательное поле.'
    await CheckoutPage.open()

    await TestHelper.inputUserData()
    await CheckoutPage.inputAddress('')
    await CheckoutPage.clickPlaceOrderButton()
    await CheckoutPage.expectErrorTextContainsText(errorText)
  })

  it('TC04. Checkout page, city is mandatory', async () => {
    const errorText = 'Город / Населенный пункт для выставления счета обязательное поле.'
    await CheckoutPage.open()

    await TestHelper.inputUserData()
    await CheckoutPage.inputCity('')
    await CheckoutPage.clickPlaceOrderButton()
    await CheckoutPage.expectErrorTextContainsText(errorText)
  })

  it('TC05. Checkout page, region is mandatory', async () => {
    const errorText = 'Область для выставления счета обязательное поле.'
    await CheckoutPage.open()

    await TestHelper.inputUserData()
    await CheckoutPage.selectCountry('Russia')
    await CheckoutPage.clickPlaceOrderButton()
    await CheckoutPage.expectErrorTextContainsText(errorText)
  })

  it('TC06. Checkout page, post code is mandatory', async () => {
    const errorText = 'Почтовый индекс для выставления счета обязательное поле.'
    await CheckoutPage.open()

    await TestHelper.inputUserData()
    await CheckoutPage.clearPostCodeValue()
    await CheckoutPage.clickPlaceOrderButton()
    await CheckoutPage.expectErrorTextContainsText(errorText)
  })

  it('TC07. Checkout page, phone number is mandatory', async () => {
    const errorText = 'неверный номер телефона'
    await CheckoutPage.open()

    await TestHelper.inputUserData()
    await CheckoutPage.inputPhoneNumber('')
    await CheckoutPage.clickPlaceOrderButton()
    await CheckoutPage.expectErrorTextContainsText(errorText)
  })

  it('TC08. Checkout page, email is mandatory', async () => {
    const errorText = 'Адрес почты для выставления счета обязательное поле.'
    await CheckoutPage.open()

    await TestHelper.inputUserData()
    await CheckoutPage.inputEmail('')
    await CheckoutPage.clickPlaceOrderButton()
    await CheckoutPage.expectErrorTextContainsText(errorText)
  })

  it('TC09. Checkout page, terms checkbox is mandatory', async () => {
    const errorText = 'Please read and accept the terms and conditions to proceed with your order.'
    await CheckoutPage.open()

    await TestHelper.inputUserData()
    await CheckoutPage.clickCheckBoxTermsAndConditions()
    await CheckoutPage.clickPlaceOrderButton()
    await CheckoutPage.expectErrorTextContainsText(errorText)
  })

  it('TC10. Checkout page, phone number wrong format', async () => {
    const errorText = 'неверный номер телефона.'
    await CheckoutPage.open()

    await TestHelper.inputUserData()
    await CheckoutPage.inputPhoneNumber('123467')
    await CheckoutPage.clickPlaceOrderButton()
    await CheckoutPage.expectErrorTextContainsText(errorText)
  })

  it('TC11. Checkout page, email wrong format', async () => {
    const errorText = 'Invalid billing email address'
    await CheckoutPage.open()

    await TestHelper.inputUserData()
    await CheckoutPage.inputEmail('qwerty')
    await CheckoutPage.clickPlaceOrderButton()
    await CheckoutPage.expectErrorTextContainsText(errorText)
  })
})
