const Page = require('./page')

class PromoPage extends Page {
  get pageTitle () {
    return $('h2=Акции')
  }

  async expectPageTitleIsDisplayed () {
    await expect(this.pageTitle).toBeDisplayed()
  }

  async expectPromoCodeIsDisplayed (promoCode) {
    await expect($(`//*[@class="content-page"]//*[contains(text(), "${promoCode}")]`)).toBeDisplayed()
  }

  open () {
    return super.open('promo/')
  }
}

module.exports = new PromoPage()
