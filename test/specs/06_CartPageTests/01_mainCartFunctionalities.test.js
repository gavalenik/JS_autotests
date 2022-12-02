const CartPage = require('../../pageobjects/cart.page');
const AllItemsPage = require('../../pageobjects/allItems.page');
const MainPage = require('../../pageobjects/main.page');

describe('Pizzeria. Main cart functionalities', () => {
  it('TC01. Text "Корзина пуста." is presented', async () => {
    await CartPage.open();

    await CartPage.expectCartEmptyTextIsDisplayed()
  });

  it('TC02. Button "Назад в магазин"', async () => {
    await CartPage.open();

    await CartPage.clickBackToShopButton()
    await AllItemsPage.expectPageTitleIsDisplayed()
  });

  it('TC03. Increase product quantity', async () => {
    await MainPage.open();

    await MainPage.addToBasketPizzaNumber(1)
    await MainPage.clickCartButton()
    const productPrice = await CartPage.getProductPrice()
    await CartPage.increaseProductQuantity()
    await CartPage.refreshCart()
    await CartPage.expectProductTotalPriceTwoTimesHigher(productPrice)
  });

  it('TC04. Delete product from cart. Cart is empty', async () => {
    await MainPage.open();

    await MainPage.addToBasketPizzaNumber(1)
    await MainPage.clickCartButton()
    await CartPage.removeProductFromCart()
    await CartPage.expectCartEmptyTextIsDisplayed()
  });

  it('TC05. Delete product from cart. Cart contains another product', async () => {
    await MainPage.open();

    await MainPage.addToBasketPizzaNumber(1)
    await MainPage.addToBasketPizzaNumber(2)
    await MainPage.clickCartButton()
    await CartPage.removeProductFromCart()
    await CartPage.expectCartIsNotEmpty()
  });

  it('TC06. Bring back deleted product to the cart', async () => {
    await MainPage.open();

    await MainPage.addToBasketPizzaNumber(1)
    await MainPage.clickCartButton()
    await CartPage.removeProductFromCart()
    await CartPage.restoreProductInCart()
    await CartPage.expectCartIsNotEmpty()
  });

  //TODO coupon code - applying correct, applying correct and then delete, applying incorrect
});
