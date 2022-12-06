const DeliveryPage = require('../../pageobjects/delivery.page');

describe('Pizzeria. Page text validation', () => {
    it('TC01. Page text validation', async () => {
        const pizzeriaInfo = {
            phoneNumber: "8 999 123-12-31",
            minOrderAmount: "800 рублей",
            orderTime: "с 9:00 до 23:59"
        }
        await DeliveryPage.open();

        await DeliveryPage.switchToIframe()
        await DeliveryPage.expectPageContainsText(pizzeriaInfo.phoneNumber)
        await DeliveryPage.expectPageContainsText(pizzeriaInfo.minOrderAmount)
        await DeliveryPage.expectPageContainsText(pizzeriaInfo.orderTime)
    });
});
