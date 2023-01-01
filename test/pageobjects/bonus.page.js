const Page = require('./page')

class BonusPage extends Page {
  get bonusPage () {
    return $('#bonus_main')
  }

  get errorTextField () {
    return $('#bonus_content')
  }

  get loader () {
    return $('.loaderPoint')
  }

  get nameField () {
    return $('#bonus_username')
  }

  get orderCardButton () {
    return $('#bonus_main .button')
  }

  get pageTitle () {
    return $('h2=Бонусная программа')
  }

  get phoneField () {
    return $('#bonus_phone')
  }

  async clickOrderCardButton () {
    await this.orderCardButton.click()
  }

  async expectPageErrorContainsText (errorText) {
    await expect(this.errorTextField).toHaveTextContaining(errorText)
  }

  async expectPageTitleIsDisplayed () {
    await expect(this.pageTitle).toBeDisplayed()
  }

  async expectPhoneFieldIsRed () {
    await expect(this.phoneField).toHaveAttribute('style', 'border-color: red;')
  }

  async expectSuccessfulMessageIsDisplayed () {
    await expect(this.bonusPage).toHaveTextContaining('Ваша карта оформлена!')
  }

  async expectUserFieldIsRed () {
    await expect(this.nameField).toHaveAttribute('style', 'border-color: red;')
  }

  async inputName (name) {
    await this.nameField.clearValue()
    await this.nameField.addValue(name)
  }

  async inputPhone (phone) {
    await this.phoneField.clearValue()
    await this.phoneField.addValue(phone)
  }

  open () {
    return super.open('bonus/')
  }

  async waitForLoaderDisappeared () {
    await this.loader.waitForExist({ timeout: 7000, reverse: true, timeoutMsg: 'Problem with loader disappearing' })
  }
}

module.exports = new BonusPage()
