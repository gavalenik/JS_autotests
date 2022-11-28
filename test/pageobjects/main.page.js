const Page = require('./page');

class MainPage extends Page {
  get menuItemMenu() {
    return $('//*[@id="menu"]//*[text()="Меню"]');
  }

  get searchField() {
    return $('.search-field');
  }

  get searchButton() {
    return $('.search-form .searchsubmit');
  }

  get loginButton() {
    return $('.account');
  }

  get basketButton() {
    return $('.view-cart');
  }

  get pizzasScrollToLeft() {
    return $('.slick-prev');
  }

  get pizzasScrollToRight() {
    return $('.slick-next');
  }

  get pageScrollUp() {
    return $('#ak-top');
  }

  get pizzasDisplayed() {
    return $$('#product1 .slick-track .slick-active')
  }

  open() {
    return super.open('');
  }

  async clickMainMenuItem(menuItem) {
    await $(`//*[@id="menu"]//*[text()="${menuItem}"]`).click();
  }

  async clickSubMenuItem(submenuItem) {
    await this.menuItemMenu.moveTo();
    await $(`//*[@id="menu"]//*[@class="sub-menu"]//*[text()="${submenuItem}"]`).click();
  }

  async clickFooterMenuItem(menuItem) {
    await $(`//*[@id="pages-2"]//*[text()="${menuItem}"]`).click();
  }

  async searchFor(itemName) {
    await this.searchField.addValue(`${itemName}\uE007`);
  }

  async searchForItemAndClickSearchButton(itemName) {
    await this.searchField.addValue(itemName);
    await this.searchButton.click()
  }

  async getPizzaNameByNumber(pizzaNumber) {
    const elem = this.pizzasDisplayed[pizzaNumber - 1].$('div > a')
    await elem.waitForDisplayed()
    return elem.getAttribute('title')
  }

  async getPizzaPriceByNumber(pizzaNumber) {
    const elem = this.pizzasDisplayed[pizzaNumber - 1].$('.amount')
    await elem.waitForDisplayed()
    return elem.getText()
  }

  async clickOnPizzaNumber(pizzaNumber) {
    const elem = this.pizzasDisplayed[pizzaNumber - 1].$('div > a')
    await elem.waitForClickable()
    await elem.click()
  }

  async addToBasketPizzaNumber(pizzaNumber) {
    const elem = this.pizzasDisplayed[pizzaNumber - 1].$('div > a.add_to_cart_button')
    await elem.moveTo()
    await elem.waitForClickable()
    await elem.click()
  }

  async expectBasketAmountIsEqualTo(pizzaPrice) {
    await expect(await this.basketButton.$('a')).toHaveTextContaining(pizzaPrice)
  }

  async scrollPizzasToLeft() {
    await this.pizzasScrollToLeft.moveTo()
    await this.pizzasScrollToLeft.waitForClickable()
    await this.pizzasScrollToLeft.click()
  }

  async scrollPizzasToRight() {
    await this.pizzasScrollToRight.moveTo()
    await this.pizzasScrollToRight.waitForClickable()
    await this.pizzasScrollToRight.click()
  }

  async expectFirstPizzaNameIsNotEqual(oldFirstPizzaName) {
    await expect(await this.getPizzaNameByNumber(1)).not.toEqual(oldFirstPizzaName)
  }

  async scrollPageToMiddle() {
    await $('html').addValue('\uE00F\uE00F')
  }

  async clickButtonScrollPageUp() {
    await this.pageScrollUp.waitForClickable()
    await this.pageScrollUp.click()
    await this.basketButton.waitForDisplayed()
  }

  async footerContainsPhoneAndEmail(phoneNumber) {
    const elem = await $(`//*[@class="top-footer-block"]//p[contains(text(), "${phoneNumber}")]`)
    await elem.scrollIntoView()
    await expect(elem).toBeDisplayed()
  }

  async socialNetworkElementHasLink(socialNetworkName, link) {
    const elem = await $(`//*[@class="top-footer-block"]//a[contains(text(), "${socialNetworkName}")]`)
    await expect(elem).toHaveLink(link)
  }
}

module.exports = new MainPage();
