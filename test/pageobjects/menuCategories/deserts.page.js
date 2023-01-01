const Page = require('../page')

class DesertsPage extends Page {
  get pageTitle () {
    return $('h1=Десерты')
  }

  async expectPageTitleIsDisplayed () {
    await expect(this.pageTitle).toBeDisplayed()
  }

  open () {
    return super.open('product-category/menu/deserts/')
  }
}

module.exports = new DesertsPage()
