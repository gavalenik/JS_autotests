const Page = require('./page');

class RegisterPage extends Page {
    get buttonRegister() {
        return $('.woocommerce-Button');
    }

    get emailField() {
        return $('#reg_email');
    }

    get errorTextField() {
        return $('.woocommerce-error > li');
    }

    get linkToLoginPage() {
        return $('=Пожалуйста авторизуйтесь.');
    }

    get pageInfo() {
        return $('.content-page');
    }

    get pageTitle() {
        return $('h2=Регистрация');
    }

    get passwordField() {
        return $('#reg_password');
    }

    get usernameField() {
        return $('#reg_username');
    }

    async clickLinkToMyAccountPage() {
        await this.linkToLoginPage.click()
    }

    async clickRegistrationButton() {
        await this.buttonRegister.click()
    }

    async expectErrorTextIsDisplayed(errorText) {
        await expect(this.errorTextField).toHaveTextContaining(errorText)
    }

    async expectPageTitleIsDisplayed() {
        await expect(this.pageTitle).toBeDisplayed()
    }

    async expectRegistrationDone() {
        await expect(this.pageInfo).toHaveText("Регистрация завершена")
    }

    async inputEmail(email) {
        await this.emailField.clearValue()
        await this.emailField.addValue(email)
    }

    async inputPassword(password) {
        await this.passwordField.clearValue()
        await this.passwordField.addValue(password)
    }

    async inputUsername(username) {
        await this.usernameField.clearValue()
        await this.usernameField.addValue(username)
    }

    open() {
        return super.open('register/');
    }
}

module.exports = new RegisterPage();
