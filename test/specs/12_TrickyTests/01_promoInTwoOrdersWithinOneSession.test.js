const TestHelper = require('../testHelper')
const CheckoutPage = require('../../pageobjects/checkout.page')

describe('Pizzeria. Tricky tests', () => {
  // If we have requirement that promo code is working ONLY for 1st order
  it.skip('TC01. **BUG** Promo code applying in second order is prohibited (one session)', async () => {
    const errorText = 'Promo code already used'

    await TestHelper.successfulRegistration()
    await TestHelper.addPizzaToCartAndPromoCodeApplying()
    await TestHelper.goToCheckoutPageAndInputUserData()
    await CheckoutPage.clickPlaceOrderButton()
    await CheckoutPage.expectOrderIsAccepted()
    await TestHelper.addPizzaToCartAndPromoCodeApplying()
    await CheckoutPage.expectErrorTextContainsText(errorText)
  })
})
