const Page = require('./page');

class RegisterPage extends Page {

    get pageTitle() {
        return $('h2=Регистрация');
    }

    open() {
        return super.open('register/');
    }

    async expectPageTitleIsDisplayed () {
        await expect(this.pageTitle).toBeDisplayed()
    }
}

module.exports = new RegisterPage();
