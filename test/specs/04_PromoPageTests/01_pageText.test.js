const PromoPage = require('../../pageobjects/promo.page');
const TestHelper = require('../testHelper')

describe('Pizzeria. Page text validation', () => {
    it('TC01. Promo code is displayed', async () => {
        await PromoPage.open();

        await PromoPage.expectPromoCodeIsDisplayed(TestHelper.promoCode)
    });
});
