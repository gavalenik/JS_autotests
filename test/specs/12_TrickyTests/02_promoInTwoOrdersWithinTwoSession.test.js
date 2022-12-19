const TestHelper = require('../testHelper')
const CheckoutPage = require("../../pageobjects/checkout.page");

describe('Pizzeria. Tricky tests', () => {

    // If we have requirement that promo code is working ONLY for 1st order
    before(async () => {
        await TestHelper.successfulRegistration()
    })

    it('TC01. Promo code applying in first order', async () => {
        await TestHelper.addPizzaToCartAndPromoCodeApplying()
        await TestHelper.goToCheckoutPageAndInputUserData()
        await CheckoutPage.clickPlaceOrderButton()
        await CheckoutPage.expectOrderIsAccepted()
    });

    it.skip('TC02. **BUG** Promo code applying in second order is prohibited (two sessions)', async () => {
        const errorText = "Promo code already used"

        await TestHelper.addPizzaToCartAndPromoCodeApplying()
        await CheckoutPage.expectErrorTextContainsText(errorText)
    });
});