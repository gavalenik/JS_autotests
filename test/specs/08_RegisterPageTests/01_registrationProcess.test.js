const RegisterPage = require('../../pageobjects/register.page');
const MyAccountPage = require('../../pageobjects/myAccount.page');

describe('Pizzeria. Register process validation', () => {
    afterEach(async () => RegisterPage.deleteCookies());

    function uniqUserData() {
        const unixTime = Math.floor(Date.now() / 1000)
        const randomPart = unixTime.toString().substring(2)
        return {name: "Bill" + randomPart, email: "js_" + randomPart + "@test.ru", password: "qwerty1234"}
    }

    it('TC01. Successful registration', async () => {
        const user = uniqUserData()

        await RegisterPage.open();
        await RegisterPage.inputUsername(user.name)
        await RegisterPage.inputEmail(user.email)
        await RegisterPage.inputPassword(user.password)
        await RegisterPage.clickRegistrationButton()
        await RegisterPage.expectRegistrationDone()
    });

    it('TC02. Empty fields', async () => {
        const errorText = "Пожалуйста, введите корректный email."
        await RegisterPage.open();

        await RegisterPage.clickRegistrationButton()
        await RegisterPage.expectErrorTextIsDisplayed(errorText)
    });

    it('TC03. Empty username', async () => {
        const user = uniqUserData()
        const errorText = "Пожалуйста введите корректное имя пользователя."
        await RegisterPage.open();

        await RegisterPage.inputEmail(user.email)
        await RegisterPage.clickRegistrationButton()
        await RegisterPage.expectErrorTextIsDisplayed(errorText)
    });

    it('TC04. Empty password', async () => {
        const user = uniqUserData()
        const errorText = "Введите пароль для регистрации."
        await RegisterPage.open();

        await RegisterPage.inputUsername(user.name)
        await RegisterPage.inputEmail(user.email)
        await RegisterPage.clickRegistrationButton()
        await RegisterPage.expectErrorTextIsDisplayed(errorText)
    });

    it('TC05. Email more than 20 symbols', async () => {
        const user = uniqUserData()
        const email = "js_auto1234567890@test.ru"
        const errorText = "Максимальное допустимое количество символов: 20"
        await RegisterPage.open();

        await RegisterPage.inputUsername(user.name)
        await RegisterPage.inputEmail(email)
        await RegisterPage.clickRegistrationButton()
        await RegisterPage.expectErrorTextIsDisplayed(errorText)
    });

    it('TC06. Username more than 20 symbols', async () => {
        const user = uniqUserData()
        const username = "Bill12345679801234567890"
        const errorText = "Максимальное допустимое количество символов: 20"
        await RegisterPage.open();

        await RegisterPage.inputUsername(username)
        await RegisterPage.inputEmail(user.email)
        await RegisterPage.clickRegistrationButton()
        await RegisterPage.expectErrorTextIsDisplayed(errorText)
    });

    it('TC07. Input existing username', async () => {
        const user = uniqUserData()
        const existingUsername = "Bill"
        const errorText = "Учетная запись с таким именем пользователя уже зарегистрирована."
        await RegisterPage.open();

        await RegisterPage.inputUsername(existingUsername)
        await RegisterPage.inputEmail(user.email)
        await RegisterPage.inputPassword(user.password)
        await RegisterPage.clickRegistrationButton()
        await RegisterPage.expectErrorTextIsDisplayed(errorText)
    });

    it('TC08. Input existing email', async () => {
        const user = uniqUserData()
        const existingEmail = "js_auto@test.ru"
        const errorText = "Учетная запись с такой почтой уже зарегистировавана."
        await RegisterPage.open();

        await RegisterPage.inputUsername(user.name)
        await RegisterPage.inputEmail(existingEmail)
        await RegisterPage.inputPassword(user.password)
        await RegisterPage.clickRegistrationButton()
        await RegisterPage.expectErrorTextIsDisplayed(errorText)
    });

    it.skip('TC09. **BUG** Redirect to my account page after input existing email', async () => {
        const user = {name: "Bill", email: "js_auto@test.ru", password: "qwerty1234"}
        await RegisterPage.open();

        await RegisterPage.inputUsername(user.name)
        await RegisterPage.inputEmail(user.email)
        await RegisterPage.inputPassword(user.password)
        await RegisterPage.clickRegistrationButton()
        await RegisterPage.clickLinkToMyAccountPage()
        await MyAccountPage.expectPageTitleIsDisplayed()
    });
});
