const Page = require('./page');

class BonusPage extends Page {
  get pageTitle() {
    return $('h2=Бонусная программа');
  }

  open() {
    return super.open('bonus/');
  }

  async expectPageTitleIsDisplayed() {
    await expect(this.pageTitle).toBeDisplayed();
  }
}

module.exports = new BonusPage();
