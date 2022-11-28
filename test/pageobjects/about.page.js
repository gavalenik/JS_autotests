const Page = require('./page');

class AboutPage extends Page {
  get pageTitle() {
    return $('h2=О нас');
  }

  open() {
    return super.open('about/');
  }

  async expectPageTitleIsDisplayed() {
    await expect(this.pageTitle).toBeDisplayed();
  }
}

module.exports = new AboutPage();
