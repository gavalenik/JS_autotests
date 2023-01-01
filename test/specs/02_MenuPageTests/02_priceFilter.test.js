const MenuPage = require('../../pageobjects/menu.page')

describe('Pizzeria. Price filter and sorting', () => {
  it('TC01. Price filter. Low price threshold change', async () => {
    await MenuPage.open()

    const productsCountBeforeFilter = await MenuPage.countProductsOnPage()
    await MenuPage.moveLeftSliderToRightForOneStep()
    await MenuPage.clickApplyButton()
    await MenuPage.expectQuantityProductsIsNotEqualTo(productsCountBeforeFilter)
  })

  it('TC02. Price filter. High price threshold change', async () => {
    await MenuPage.open()

    const productsCountBeforeFilter = await MenuPage.countProductsOnPage()
    await MenuPage.moveRightSliderToLeftForOneStep()
    await MenuPage.clickApplyButton()
    await MenuPage.expectQuantityProductsIsNotEqualTo(productsCountBeforeFilter)
  })

  it('TC03. Products sorting - price ascending', async () => {
    const sortingType = 'По возрастанию цены'
    await MenuPage.open()

    const pricesListBeforeSorting = await MenuPage.productPriceList()
    await MenuPage.applySorting(sortingType)
    await MenuPage.expectElementsOrderedIsEqualWithOrderedAscending(pricesListBeforeSorting)
  })

  it('TC04. Products sorting - price descending', async () => {
    const sortingType = 'По убыванию цены'
    await MenuPage.open()

    const pricesListBeforeSorting = await MenuPage.productPriceList()
    await MenuPage.applySorting(sortingType)
    await MenuPage.expectElementsOrderedIsEqualWithOrderedDescending(pricesListBeforeSorting)
  })
})
