const Page = require('./page');

class MyAccountPage extends Page {
    get pageTitle() {
        return $('h2=Мой аккаунт');
    }

    async expectPageTitleIsDisplayed () {
        await expect(this.pageTitle).toBeDisplayed()
    }

    open() {
        return super.open('my-account/');
    }
}

module.exports = new MyAccountPage();
