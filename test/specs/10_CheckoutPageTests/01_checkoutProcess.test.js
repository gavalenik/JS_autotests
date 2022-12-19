const MainPage = require('../../pageobjects/main.page');
const CheckoutPage = require('../../pageobjects/checkout.page');
const TestHelper = require('../testHelper')

describe('Pizzeria. Checkout process validation', () => {

    afterEach(async () => {
        await MainPage.deleteCookies()
    });

    it('TC01. Promo code applying', async () => {
        await TestHelper.addPizzaToCartAndAuthorization()

        const orderAmountBeforeDiscount = await CheckoutPage.getOrderAmount()
        await CheckoutPage.applyPromoCode(TestHelper.promoCode)
        await CheckoutPage.expectOrderAmountIs10PercentLess(orderAmountBeforeDiscount)
    });

    it('TC02. Order is completed, payment via bank', async () => {
        await TestHelper.addPizzaToCartAndAuthorization()

        await TestHelper.inputUserData()
        await CheckoutPage.clickPlaceOrderButton()
        await CheckoutPage.expectOrderIsAccepted()
    });

    it('TC03. Order is completed, payment via cash', async () => {
        const dateOfOrder = "01221999" //mmDDyyyy
        const comment = "Just for test"
        await TestHelper.addPizzaToCartAndAuthorization()

        await TestHelper.inputUserData()
        await CheckoutPage.choosePaymentCashWithDelivery()
        await CheckoutPage.inputDateOfOrder(dateOfOrder)
        await CheckoutPage.inputComment(comment)
        await CheckoutPage.clickPlaceOrderButton()
        await CheckoutPage.expectOrderIsAccepted()
    });
});