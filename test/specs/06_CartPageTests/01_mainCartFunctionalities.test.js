const CartPage = require('../../pageobjects/cart.page')
const AllItemsPage = require('../../pageobjects/allItems.page')
const MainPage = require('../../pageobjects/main.page')
const TestHelper = require('../testHelper')

describe('Pizzeria. Main cart functionalities', () => {
  afterEach(async () => CartPage.deleteCookies())

  it('TC01. Text "Корзина пуста." is presented', async () => {
    await CartPage.open()

    await CartPage.expectCartEmptyTextIsDisplayed()
  })

  it('TC02. Button "Назад в магазин"', async () => {
    await CartPage.open()

    await CartPage.clickBackToShopButton()
    await AllItemsPage.expectPageTitleIsDisplayed()
  })

  it('TC03. Increase product quantity', async () => {
    await MainPage.open()

    await MainPage.addToBasketPizzaNumber(1)
    await MainPage.clickCartButton()
    const productPrice = await CartPage.getProductPrice()
    await CartPage.increaseProductQuantity()
    await CartPage.refreshCart()
    await CartPage.expectProductTotalPriceTwoTimesHigher(productPrice)
  })

  it('TC04. Delete product from cart. Cart is empty', async () => {
    await MainPage.open()

    await MainPage.addToBasketPizzaNumber(1)
    await MainPage.clickCartButton()
    await CartPage.removeProductFromCart()
    await CartPage.expectCartEmptyTextIsDisplayed()
  })

  it('TC05. Delete product from cart. Cart contains another product', async () => {
    await MainPage.open()

    await MainPage.addToBasketPizzaNumber(1)
    await MainPage.addToBasketPizzaNumber(2)
    await MainPage.clickCartButton()
    await CartPage.removeProductFromCart()
    await CartPage.expectCartIsNotEmpty()
  })

  it('TC06. Bring back deleted product to the cart', async () => {
    await MainPage.open()

    await MainPage.addToBasketPizzaNumber(1)
    await MainPage.clickCartButton()
    await CartPage.removeProductFromCart()
    await CartPage.restoreProductInCart()
    await CartPage.expectCartIsNotEmpty()
  })

  it('TC07. Promo code applying', async () => {
    const orderAmountWithoutDiscount = await TestHelper.addPizzaToCartAndPromoCodeApplying()
    await CartPage.expectTotalAmountReduceForTenPercent(orderAmountWithoutDiscount)
  })

  it('TC08. Apply and delete promo code', async () => {
    const orderAmountWithoutDiscount = await TestHelper.addPizzaToCartAndPromoCodeApplying()
    await CartPage.removePromoCode()
    await CartPage.expectOrderAmountIsEqualTo(orderAmountWithoutDiscount)
  })

  it('TC09. Wrong promo code', async () => {
    const promoCode = 'GIVE'
    const errorText = 'Неверный купон.'
    await MainPage.open()

    await MainPage.addToBasketPizzaNumber(1)
    await MainPage.clickCartButton()
    await CartPage.inputAndApplyPromoCode(promoCode)
    await CartPage.expectErrorIsDisplayed(errorText)
  })
})
