const MainPage = require('../../pageobjects/main.page');
const CartPage = require('../../pageobjects/cart.page');
const CheckoutPage = require('../../pageobjects/checkout.page');

describe('Pizzeria. Checkout process validation', () => {

    const user2 = {name: "Billy", email: "js_auto2@test.ru", password: "qwerty1234"}

    it('TC01. Login via checkout page',async () => {
        await MainPage.open()
        await MainPage.addToBasketPizzaNumber(1)
        await MainPage.clickCartButton()
        await CartPage.clickGoToPaymentButton()
        await CheckoutPage.clickAuthorizationLink()
        await CheckoutPage.inputUsername(user2.name)
        await CheckoutPage.inputPassword(user2.password)
        await CheckoutPage.clickLoginButton()
        await CheckoutPage.expectCheckoutDetailsPageDisplayed()
    })

    it('TC02. Promo code applying', async () => {
        const promoCode = "GIVEMEHALYAVA"
        await CheckoutPage.open();

        const orderAmountBeforeDiscount = await CheckoutPage.getOrderAmount()
        await CheckoutPage.applyPromoCode(promoCode)
        await CheckoutPage.expectOrderAmountIs10PercentLess(orderAmountBeforeDiscount)
    });
});
