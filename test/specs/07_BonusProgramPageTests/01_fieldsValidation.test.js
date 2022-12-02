const BonusPage = require('../../pageobjects/bonus.page');

describe('Pizzeria. Bonus program fields validation', () => {
  it('TC01. Text "Корзина пуста." is presented', async () => {
    await BonusPage.open();

    await BonusPage.clickOrderCardButton()
    //TODO expect
  });
});
