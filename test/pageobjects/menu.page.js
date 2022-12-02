const Page = require('./page');

class MenuPage extends Page {
  get applyButton() {
    return $('.button[type="submit"]');
  }

  get pageTitle() {
    return $('h1=Меню');
  }

  get priceFilterLeftSlider() {
    return $('.price_slider .ui-slider-handle:nth-of-type(1)');
  }

  get priceFilterRightSlider() {
    return $('.price_slider .ui-slider-handle:nth-of-type(2)');
  }

  get products() {
    return $$('#primary .product');
  }

  get sortingSelectBar() {
    return $('.orderby');
  }

  async applySorting(sortingType) {
    await this.sortingSelectBar.selectByVisibleText(sortingType)
  }

  async clickApplyButton() {
    await this.applyButton.click()
  }

  async clickCategory(category) {
    await $(`//*[@class="product-categories"]//*[text()="${category}"]`).click();
  }

  async countProductsOnPage() {
    return await this.products.length
  }

  async expectElementsOrderedIsEqualWithOrderedAscending(unorderedPriceList) {
    const orderedPriceList = await this.productPriceList()
    await expect(unorderedPriceList.sort()).toEqual(orderedPriceList)
  }

  async expectElementsOrderedIsEqualWithOrderedDescending(unorderedPriceList) {
    const orderedPriceList = await this.productPriceList()
    await expect(unorderedPriceList.sort().reverse()).toEqual(orderedPriceList)
  }

  async expectPageTitleIsDisplayed() {
    await expect(this.pageTitle).toBeDisplayed();
  }

  async expectQuantityProductsIsNotEqualTo(quantityBefore) {
    expect(await this.products.length).not.toEqual(quantityBefore)
  }

  async moveLeftSliderToRightForOneStep() {
    const elem = await this.priceFilterLeftSlider
    await elem.click()
    await elem.addValue("\uE014")
  }

  async moveRightSliderToLeftForOneStep() {
    const elem = await this.priceFilterRightSlider
    await elem.click()
    await elem.addValue("\uE012")
  }

  open() {
    return super.open('product-category/menu/');
  }

  async productPriceList() {
    const priceList = []
    const products = await this.products
    for (const elem of products) {
      const productPrice = await elem.$('.amount > bdi').getText()
      priceList.push(productPrice)
    }
    return priceList
  }
}

module.exports = new MenuPage();
