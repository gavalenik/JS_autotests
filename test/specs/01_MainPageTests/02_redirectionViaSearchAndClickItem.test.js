const MainPage = require('../../pageobjects/main.page');
const ItemPage = require('../../pageobjects/item.page');

describe('Pizzeria. Redirect via search and items click', () => {
    it('TC01. Search for "Булочка"', async () => {
        const itemName = "Булочка"
        await MainPage.open();

        await MainPage.searchFor(itemName);
        await ItemPage.expectPageTitleContains(itemName)
        await ItemPage.expectUrlIs('http://pizzeria.skillbox.cc/product/%d0%b4%d0%b5%d1%81%d0%b5%d1%80%d1%82-%d0%b1%d1%83%d0%bb%d0%be%d1%87%d0%ba%d0%b0-%d1%81-%d0%ba%d0%be%d1%80%d0%b8%d1%86%d0%b5%d0%b9/');
    });

    it('TC02. Search for "Напиток"', async () => {
        const itemName = "Напиток"
        await MainPage.open();

        await MainPage.searchForItemAndClickSearchButton(itemName);
        await ItemPage.expectPageTitleContains(itemName)
        await ItemPage.expectUrlIs('http://pizzeria.skillbox.cc/?s=%D0%9D%D0%B0%D0%BF%D0%B8%D1%82%D0%BE%D0%BA&post_type=product');
    });

    it('TC03. Click item and redirect to item page', async () => {
        const pizzaNumber = 3
        await MainPage.open();

        const pizzaName = await MainPage.getPizzaNameByNumber(pizzaNumber)
        await MainPage.clickOnPizzaNumber(pizzaNumber)
        await ItemPage.expectPageTitleContains(pizzaName)
    });
});
