const MainPage = require('../../pageobjects/main.page');
const PizzaPage = require("../../pageobjects/menuCategories/pizza.page");
const {respondHeaders, respondData} = require("./01_respondData")

describe('Pizzeria. Network tests. Pizzas', () => {

    const url = 'product-category/menu/pizza/'

    before(async () => {
        const puppeteer = await browser.getPuppeteer();
        global.page = (await puppeteer.pages())[0];
        await page.setRequestInterception(true)

        page.on('request', (request) => {
            if (request.url().includes(url) && 'upgrade-insecure-requests' in request.headers()) {
                request.respond({
                    status: 200,
                    headers: respondHeaders,
                    contentType: 'text/html',
                    body: respondData
                })
            }
            request.continue()
        })
    })

    it('TC01. Custom title of Pizzas Page. No pizzas on page', async () => {
        await MainPage.open();

        await MainPage.clickSubMenuItem('Пицца');
        await PizzaPage.expectPageTitleFromMock('Заголовок страницы из Мок')
    });
});