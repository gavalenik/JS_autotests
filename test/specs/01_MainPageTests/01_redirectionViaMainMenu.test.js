const MainPage = require('../../pageobjects/main.page');
const MenuPage = require('../../pageobjects/menu.page');
const PizzaPage = require('../../pageobjects/menuCategories/pizza.page');
const DesertsPage = require('../../pageobjects/menuCategories/deserts.page');
const DrinksPage = require('../../pageobjects/menuCategories/drinks.page');
const DeliveryPage = require('../../pageobjects/delivery.page');
const PromoPage = require('../../pageobjects/promo.page');
const AboutUsPage = require('../../pageobjects/aboutUs.page');
const CartPage = require('../../pageobjects/cart.page');
const MyAccountPage = require('../../pageobjects/myAccount.page');
const BonusPage = require('../../pageobjects/bonus.page');

describe('Pizzeria. Redirect via main menu', () => {
  it('TC01. Click menu item "Главная"', async () => {
    await MainPage.open();

    await MainPage.clickMainMenuItem('Главная');
    await MainPage.expectUrlIs('http://pizzeria.skillbox.cc/');
  });

  it('TC02. Click menu item "Меню"', async () => {
    await MainPage.open();

    await MainPage.clickMainMenuItem('Меню');
    await MenuPage.expectPageTitleIsDisplayed();
    await MenuPage.expectUrlIs('http://pizzeria.skillbox.cc/product-category/menu/');
  });

  it('TC03. Click menu item "Доставка и оплата"', async () => {
    await MainPage.open();

    await MainPage.clickMainMenuItem('Доставка и оплата');
    await DeliveryPage.expectPageTitleIsDisplayed();
    await DeliveryPage.expectUrlIs('http://pizzeria.skillbox.cc/delivery/');
  });

  it('TC04. Click menu item "Акции"', async () => {
    await MainPage.open();

    await MainPage.clickMainMenuItem('Акции');
    await PromoPage.expectPageTitleIsDisplayed();
    await PromoPage.expectUrlIs('http://pizzeria.skillbox.cc/promo/');
  });

  it('TC05. Click menu item "О нас"', async () => {
    await MainPage.open();

    await MainPage.clickMainMenuItem('О нас');
    await AboutUsPage.expectPageTitleIsDisplayed();
    await AboutUsPage.expectUrlIs('http://pizzeria.skillbox.cc/about/');
  });

  it('TC06. Click menu item "Корзина"', async () => {
    await MainPage.open();

    await MainPage.clickMainMenuItem('Корзина');
    await CartPage.expectPageTitleIsDisplayed();
    await CartPage.expectUrlIs('http://pizzeria.skillbox.cc/cart/');
  });

  it('TC07. Click menu item "Мой аккаунт"', async () => {
    await MainPage.open();

    await MainPage.clickMainMenuItem('Мой аккаунт');
    await MyAccountPage.expectPageTitleIsDisplayed();
    await MyAccountPage.expectUrlIs('http://pizzeria.skillbox.cc/my-account/');
  });

  it('TC08. Click menu item "Бонусная программа"', async () => {
    await MainPage.open();

    await MainPage.clickMainMenuItem('Бонусная программа');
    await BonusPage.expectPageTitleIsDisplayed();
    await BonusPage.expectUrlIs('http://pizzeria.skillbox.cc/bonus/');
  });

  it('TC09. Click sub menu item "Пицца"', async () => {
    await MainPage.open();

    await MainPage.clickSubMenuItem('Пицца');
    await PizzaPage.expectPageTitleIsDisplayed()
    await PizzaPage.expectUrlIs('http://pizzeria.skillbox.cc/product-category/menu/pizza/');
  });

  it('TC10. Click sub menu item "Десерты"', async () => {
    await MainPage.open();

    await MainPage.clickSubMenuItem('Десерты');
    await DesertsPage.expectPageTitleIsDisplayed()
    await DesertsPage.expectUrlIs('http://pizzeria.skillbox.cc/product-category/menu/deserts/');
  });

  it('TC11. Click sub menu item "Напитки"', async () => {
    await MainPage.open();

    await MainPage.clickSubMenuItem('Напитки');
    await DrinksPage.expectPageTitleIsDisplayed();
    await DrinksPage.expectUrlIs('http://pizzeria.skillbox.cc/product-category/menu/drinks/');
  });
});
