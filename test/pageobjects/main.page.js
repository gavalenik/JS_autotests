const Page = require('./page');

class MainPage extends Page {
  get menuItemMenu() {
    return $('//*[@id="menu"]//*[text()="Меню"]');
  }

  async clickMainMenuItem(menuItem) {
    await $(`//*[@id="menu"]//*[text()="${menuItem}"]`).click();
  }

  async clickSubMenuItem(submenuItem) {
    await this.menuItemMenu.moveTo();
    await $(`//*[@id="menu"]//*[@class="sub-menu"]//*[text()="${submenuItem}"]`).click();
  }

  open() {
    return super.open('');
  }
}

module.exports = new MainPage();
