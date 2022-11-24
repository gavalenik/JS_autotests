const Page = require('./page');

class AboutPage extends Page {
  get pageTitle() {
    const abra = 'О нас';
    return $(`h2=${abra}`);
  }

  open() {
    return super.open('about/');
  }

  async expectPageTitleIsDisplayed() {
    await expect(this.pageTitle).toBeDisplayed();
  }
}

module.exports = new AboutPage();
