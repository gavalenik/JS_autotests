const MyAccountPage = require('../../pageobjects/myAccount.page');

describe('Pizzeria. Authorization process validation', () => {
    afterEach(async () => MyAccountPage.deleteCookies());

    const user = {name: "Bill", email: "js_auto@test.ru", password: "qwerty1234"}

    it('TC01. Successful authorization with username', async () => {
        await MyAccountPage.open();

        await MyAccountPage.inputUsername(user.name)
        await MyAccountPage.inputPassword(user.password)
        await MyAccountPage.clickLoginButton()
        await MyAccountPage.expectPageContainsText("Привет " + user.name)
    });

    it('TC02. Successful authorization with email', async () => {
        await MyAccountPage.open();

        await MyAccountPage.inputUsername(user.email)
        await MyAccountPage.inputPassword(user.password)
        await MyAccountPage.clickLoginButton()
        await MyAccountPage.expectPageContainsText("Привет " + user.name)
    });

    it('TC03. Logout', async () => {
        await MyAccountPage.open();

        await MyAccountPage.inputUsername(user.name)
        await MyAccountPage.inputPassword(user.password)
        await MyAccountPage.clickLoginButton()
        await MyAccountPage.clickLogout()
        await MyAccountPage.expectLogoutSuccessful()
    });

    it('TC04. Wrong username', async () => {
        const errorText = "Неизвестное имя пользователя. Попробуйте еще раз или укажите адрес почты."
        await MyAccountPage.open();

        await MyAccountPage.inputUsername("NotExistUser")
        await MyAccountPage.inputPassword(user.password)
        await MyAccountPage.clickLoginButton()
        await MyAccountPage.expectPageContainsErrorText(errorText)
    });

    it('TC05. Wrong password', async () => {
        const errorText = `Веденный пароль для пользователя ${user.name} неверный.`
        await MyAccountPage.open();

        await MyAccountPage.inputUsername(user.name)
        await MyAccountPage.inputPassword("wrongPassword")
        await MyAccountPage.clickLoginButton()
        await MyAccountPage.expectPageContainsErrorText(errorText)
    });

    it('TC06. Forgot password', async () => {
        const text = "Password reset email has been sent."
        await MyAccountPage.open();

        await MyAccountPage.clickForgotPassword()
        await MyAccountPage.forgotPasswordUsernameInput(user.name)
        await MyAccountPage.clickResetPasswordButton()
        await MyAccountPage.expectPageMessageContainsText(text)
    });

    it('TC07. Forgot password, empty field', async () => {
        const errorText = "Введите имя пользователя или почту."
        await MyAccountPage.open();

        await MyAccountPage.clickForgotPassword()
        await MyAccountPage.clickResetPasswordButton()
        await MyAccountPage.expectPageContainsErrorText(errorText)
    });

    it('TC08. Forgot password, non existing user', async () => {
        const errorText = "Неверное имя пользователя или почта."
        await MyAccountPage.open();

        await MyAccountPage.clickForgotPassword()
        await MyAccountPage.forgotPasswordUsernameInput("NonExistingUser")
        await MyAccountPage.clickResetPasswordButton()
        await MyAccountPage.expectPageContainsErrorText(errorText)
    });
});