const MainPage = require('../../pageobjects/main.page');
const DeliveryPage = require('../../pageobjects/delivery.page');
const PromoPage = require('../../pageobjects/promo.page');
const AboutUsPage = require('../../pageobjects/aboutUs.page');
const CartPage = require('../../pageobjects/cart.page');
const MyAccountPage = require('../../pageobjects/myAccount.page');
const BonusPage = require('../../pageobjects/bonus.page');
const AllItemsPage = require('../../pageobjects/allItems.page')
const RegisterPage = require('../../pageobjects/register.page')

describe('Pizzeria. Redirect via footer menu', () => {
  it('TC01. Click footer menu item "Акции"', async () => {
    await MainPage.open();

    await MainPage.clickFooterMenuItem('Акции');
    await PromoPage.expectPageTitleIsDisplayed();
    await PromoPage.expectUrlIs('http://pizzeria.skillbox.cc/promo/');
  });

  it('TC02. Click footer menu item "Бонусная программа"', async () => {
    await MainPage.open();

    await MainPage.clickFooterMenuItem('Бонусная программа');
    await BonusPage.expectPageTitleIsDisplayed();
    await BonusPage.expectUrlIs('http://pizzeria.skillbox.cc/bonus/');
  });

  it('TC03. Click footer menu item "Все товары"', async () => {
    await MainPage.open();

    await MainPage.clickFooterMenuItem('Все товары');
    await AllItemsPage.expectPageTitleIsDisplayed();
    await AllItemsPage.expectUrlIs('http://pizzeria.skillbox.cc/shop/');
  });

  it('TC04. Click footer menu item "Главная"', async () => {
    await MainPage.open();

    await MainPage.clickFooterMenuItem('Главная');
    await MainPage.expectUrlIs('http://pizzeria.skillbox.cc/');
  })

  it('TC05. Click footer menu item "Доставка и оплата"', async () => {
    await MainPage.open();

    await MainPage.clickFooterMenuItem('Доставка и оплата');
    await DeliveryPage.expectPageTitleIsDisplayed();
    await DeliveryPage.expectUrlIs('http://pizzeria.skillbox.cc/delivery/');
  });

  it('TC06. Click footer menu item "Корзина"', async () => {
    await MainPage.open();

    await MainPage.clickFooterMenuItem('Корзина');
    await CartPage.expectPageTitleIsDisplayed();
    await CartPage.expectUrlIs('http://pizzeria.skillbox.cc/cart/');
  });

  it('TC07. Click footer menu item "Мой аккаунт"', async () => {
    await MainPage.open();

    await MainPage.clickFooterMenuItem('Мой аккаунт');
    await MyAccountPage.expectPageTitleIsDisplayed();
    await MyAccountPage.expectUrlIs('http://pizzeria.skillbox.cc/my-account/');
  });

  it('TC08. Click footer menu item "О нас"', async () => {
    await MainPage.open();

    await MainPage.clickFooterMenuItem('О нас');
    await AboutUsPage.expectPageTitleIsDisplayed();
    await AboutUsPage.expectUrlIs('http://pizzeria.skillbox.cc/about/');
  });

  it('TC09. Click footer menu item "Регистрация"', async () => {
    await MainPage.open();

    await MainPage.clickFooterMenuItem('Регистрация');
    await RegisterPage.expectPageTitleIsDisplayed();
    await RegisterPage.expectUrlIs('http://pizzeria.skillbox.cc/register/');
  });
});
