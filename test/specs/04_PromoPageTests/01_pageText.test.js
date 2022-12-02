const PromoPage = require('../../pageobjects/promo.page');

describe('Pizzeria. Page text validation', () => {
  it('TC01. Promo code is displayed', async () => {
    const promoCode = "GIVEMEHALYAVA"
    await PromoPage.open();

    await PromoPage.expectPromoCodeIsDisplayed(promoCode)
  });
});
