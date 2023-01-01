const Page = require('./page')

class AllItemsPage extends Page {
  get pageTitle () {
    return $('h1=Все товары')
  }

  async expectPageTitleIsDisplayed () {
    await expect(this.pageTitle).toBeDisplayed()
  }

  open () {
    return super.open('shop/')
  }
}

module.exports = new AllItemsPage()
