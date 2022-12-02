const Page = require('./page');

class BonusPage extends Page {
  get nameField() {
    return $('#bonus_username');
  }

  get orderCardButton() {
    return $('#bonus_main .button');
  }

  get pageTitle() {
    return $('h2=Бонусная программа');
  }

  get phoneField() {
    return $('#bonus_phone');
  }

  get textField() {
    return $('#bonus_content');
  }

  async clickOrderCardButton() {
    await this.orderCardButton.click()
  }

  async expectPageTitleIsDisplayed() {
    await expect(this.pageTitle).toBeDisplayed();
  }

  open() {
    return super.open('bonus/');
  }
}

module.exports = new BonusPage();
