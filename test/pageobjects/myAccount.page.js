const Page = require('./page');

class MyAccountPage extends Page {
    get forgotPasswordLink() {
        return $('=Забыли пароль?');
    }

    get forgotPasswordUsernameField() {
        return $('#user_login');
    }

    get resetPasswordButton() {
        return $('button[value="Reset password"]');
    }

    get errorTextField() {
        return $('.woocommerce-error');
    }

    get loginButton() {
        return $('button[value="Войти"]');
    }

    get logoutButton() {
        return $('.woocommerce-MyAccount-navigation-link--customer-logout > a');
    }

    get pageInfo() {
        return $('.woocommerce-MyAccount-content > p');
    }

    get pageMessage() {
        return $('.woocommerce-message');
    }

    get pageTitle() {
        return $('h2=Мой аккаунт');
    }

    get passwordField() {
        return $('#password');
    }

    get rememberMeCheckbox() {
        return $('#rememberme');
    }

    get usernameField() {
        return $('#username');
    }

    async clickForgotPassword() {
        await this.forgotPasswordLink.click()
    }

    async clickLoginButton() {
        await this.loginButton.click()
    }

    async clickResetPasswordButton() {
        await this.resetPasswordButton.click()
    }

    async clickLogout() {
        await this.logoutButton.click()
    }

    async expectLogoutSuccessful() {
        await expect(this.loginButton).toBeDisplayed()
    }

    async expectPageContainsErrorText(errorText) {
        await expect(this.errorTextField).toHaveTextContaining(errorText)
    }

    async expectPageContainsText(text) {
        await expect(this.pageInfo).toHaveTextContaining(text)
    }

    async expectPageMessageContainsText(text) {
        await expect(this.pageMessage).toHaveTextContaining(text)
    }

    async expectPageTitleIsDisplayed() {
        await expect(this.pageTitle).toBeDisplayed()
    }

    async forgotPasswordUsernameInput(username) {
        await this.forgotPasswordUsernameField.addValue(username)
    }

    async inputPassword(password) {
        await this.passwordField.addValue(password)
    }

    async inputUsername(username) {
        await this.usernameField.addValue(username)
    }

    open() {
        return super.open('my-account/');
    }
}

module.exports = new MyAccountPage();
