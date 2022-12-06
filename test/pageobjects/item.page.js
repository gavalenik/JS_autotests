const Page = require('./page');

class ItemPage extends Page {
    async expectPageTitleContains(itemName) {
        await expect(await $(`//h1[contains(text(), "${itemName}")]`))
            .toHaveTextContaining(itemName, {ignoreCase: true})
    }
}

module.exports = new ItemPage();
