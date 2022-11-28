const MainPage = require('../../pageobjects/main.page');

describe('Pizzeria. Add item to basket. Scrolling pizzas and page', () => {
  it('TC01. Add pizza to basket', async () => {
    const pizzaNumber = 2
    await MainPage.open();

    const pizzaPrice = await MainPage.getPizzaPriceByNumber(pizzaNumber)
    await MainPage.addToBasketPizzaNumber(pizzaNumber)
    await MainPage.expectBasketAmountIsEqualTo(pizzaPrice)
  });

  it('TC02. Scroll pizzas to left', async () => {
    await MainPage.open();

    const firstPizzaNameBeforeScroll = await MainPage.getPizzaNameByNumber(1)
    await MainPage.scrollPizzasToLeft()
    await MainPage.expectFirstPizzaNameIsNotEqual(firstPizzaNameBeforeScroll)
  });

  it('TC03. Scroll pizzas to right', async () => {
    await MainPage.open();

    const firstPizzaNameBeforeScroll = await MainPage.getPizzaNameByNumber(1)
    await MainPage.scrollPizzasToRight()
    await MainPage.expectFirstPizzaNameIsNotEqual(firstPizzaNameBeforeScroll)
  });

  it('TC04. Scroll page to up', async () => {
    await MainPage.open();

    await MainPage.scrollPageToMiddle()
    await MainPage.clickButtonScrollPageUp()
  });
});
