const TestHelper = require("../testHelper");
const CartPage = require('../../pageobjects/cart.page')
const {respondHeaders, respondData} = require("./02_respondData")

describe('Pizzeria. Network tests. Cart', () => {

    const url = '?wc-ajax=apply_coupon'

    before(async () => {
        const puppeteer = await browser.getPuppeteer();
        global.page = (await puppeteer.pages())[0];
        await page.setRequestInterception(true)

        page.on('request', (request) => {
            if (request.url().includes(url)) {
                request.respond({
                    status: 201, //500 - message is not displayed on a page
                    headers: respondHeaders,
                    contentType: 'text/html',
                    body: respondData
                })
            }
            request.continue()
        })
    })

    it('TC01. **BUG** Promo code 500 error', async () => {
        await TestHelper.addPizzaToCartAndPromoCodeApplying()
        await CartPage.expectErrorIsDisplayed("Server isn't responded")
    });
})
;