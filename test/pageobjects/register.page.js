const Page = require('./page');

class RegisterPage extends Page {
    get pageTitle() {
        return $('h2=Регистрация');
    }

    async expectPageTitleIsDisplayed () {
        await expect(this.pageTitle).toBeDisplayed()
    }

    open() {
        return super.open('register/');
    }
}

module.exports = new RegisterPage();
