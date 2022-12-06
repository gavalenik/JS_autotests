const Page = require('./page');

class AboutUsPage extends Page {
    get pageTitle() {
        return $('h2=О нас');
    }

    async expectPageTextIsDisplayedAndIsEqualTo(text) {
        const elem = await $(`//*[@class="content-page"]//*[text()="${text}"]`)
        await expect(elem).toBeDisplayed();
    }

    async expectPageTitleIsDisplayed() {
        await expect(this.pageTitle).toBeDisplayed();
    }

    open() {
        return super.open('about/');
    }
}

module.exports = new AboutUsPage();
