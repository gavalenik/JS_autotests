const Page = require('./page');

class MenuPage extends Page {
  get pageTitle() {
    return $('h1=Меню');
  }

  get pizzaPageTitle() {
    return $('h1=Пицца');
  }

  get desertsPageTitle() {
    return $('h1=Десерты');
  }

  get drinksPageTitle() {
    return $('h1=Напитки');
  }

  open() {
    return super.open('product-category/menu/');
  }

  async expectPageTitleIsDisplayed() {
    await expect(this.pageTitle).toBeDisplayed();
  }

  async expectPizzaPageTitleIsDisplayed() {
    await expect(this.pizzaPageTitle).toBeDisplayed();
  }

  async expectDesertsPageTitleIsDisplayed() {
    await expect(this.desertsPageTitle).toBeDisplayed();
  }

  async expectDrinksPageTitleIsDisplayed() {
    await expect(this.drinksPageTitle).toBeDisplayed();
  }
}

module.exports = new MenuPage();
