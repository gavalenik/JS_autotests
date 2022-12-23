const MainPage = require('../../pageobjects/main.page');

describe('Pizzeria. Contact Information', () => {
    it('TC01. Phone number and email validation', async () => {
        const phoneNumber = "+7-999-123-12-31"
        const email = "pizza@fatta.ru"
        await MainPage.open();

        await MainPage.expectFooterContainsPhoneAndEmail(phoneNumber)
        await MainPage.expectFooterContainsPhoneAndEmail(email)
    });

    it('TC02. Facebook link validation', async () => {
        const socialNetworkLink = "https://www.facebook.com/skillboxru"
        await MainPage.open();

        await MainPage.socialNetworkElementHasLink("Facebook", socialNetworkLink)
    });

    it('TC03. VKontakte link validation', async () => {
        const socialNetworkLink = "https://vk.com/skillbox"
        await MainPage.open();

        await MainPage.socialNetworkElementHasLink("ВКонтакте", socialNetworkLink)
    });

    it('TC04. Instagram link validation', async () => {
        const socialNetworkLink = "https://www.instagram.com/skillbox.ru/"
        await MainPage.open();

        await MainPage.socialNetworkElementHasLink("Instagram", socialNetworkLink)
    });
});
