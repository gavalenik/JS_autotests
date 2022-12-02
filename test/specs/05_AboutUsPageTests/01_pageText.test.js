const AboutUsPage = require('../../pageobjects/aboutUs.page');

describe('Pizzeria. Page text validation', () => {
  it('TC01. Promo code is displayed', async () => {
    const text = "Делаем уже более 20 лет пиццу и десерты по старинным проверенным рецептам!"
    await AboutUsPage.open();

    await AboutUsPage.expectPageTextIsDisplayedAndIsEqualTo(text)
  });
});
