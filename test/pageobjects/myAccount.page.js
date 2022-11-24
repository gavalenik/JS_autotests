const Page = require('./page');

class MyAccountPage extends Page {

    get pageTitle() {
        return $('h2=Мой аккаунт');
    }

    open() {
        return super.open('my-account/');
    }

    async expectPageTitleIsDisplayed () {
        await expect(this.pageTitle).toBeDisplayed()
    }
}

module.exports = new MyAccountPage();
