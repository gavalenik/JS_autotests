const BonusPage = require('../../pageobjects/bonus.page')
const TestHelper = require('../testHelper')

describe('Pizzeria. Bonus program fields validation', () => {
  it('TC01. Successful registration', async () => {
    const name = TestHelper.user1.name
    const phone = TestHelper.user1.phone
    await BonusPage.open()

    await BonusPage.inputName(name)
    await BonusPage.inputPhone(phone)
    await BonusPage.clickOrderCardButton()
    await BonusPage.clickOkInAlertWindow()
    await BonusPage.waitForLoaderDisappeared()
    await BonusPage.expectSuccessfulMessageIsDisplayed()
  })

  it('TC02. Both fields are empty', async () => {
    const nameErrorText = 'Поле "Имя" обязательно для заполнения'
    const phoneErrorText = 'Поле "Телефон" обязательно для заполнения'
    await BonusPage.open()

    await BonusPage.clickOrderCardButton()
    await BonusPage.expectUserFieldIsRed()
    await BonusPage.expectPhoneFieldIsRed()
    await BonusPage.expectPageErrorContainsText(nameErrorText)
    await BonusPage.expectPageErrorContainsText(phoneErrorText)
  })

  it('TC03. Wrong phone format', async () => {
    const name = 'Bill'
    const phone = '+7700'
    const phoneErrorText = 'Введен неверный формат телефона'
    await BonusPage.open()

    await BonusPage.inputName(name)
    await BonusPage.inputPhone(phone)
    await BonusPage.clickOrderCardButton()
    await BonusPage.expectPhoneFieldIsRed()
    await BonusPage.expectPageErrorContainsText(phoneErrorText)
  })
})
