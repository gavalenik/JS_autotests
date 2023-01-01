const MenuPage = require('../../pageobjects/menu.page')
const PizzaPage = require('../../pageobjects/menuCategories/pizza.page')
const DesertsPage = require('../../pageobjects/menuCategories/deserts.page')
const DrinksPage = require('../../pageobjects/menuCategories/drinks.page')
const CatalogPage = require('../../pageobjects/menuCategories/catalog.page')

describe('Pizzeria. Redirect via category widget', () => {
  it('TC01. Click category "Десерты"', async () => {
    await MenuPage.open()

    await MenuPage.clickCategory('Десерты')
    await DesertsPage.expectPageTitleIsDisplayed()
    await DesertsPage.expectUrlIs('http://pizzeria.skillbox.cc/product-category/menu/deserts/')
  })

  it('TC02. Click category "Каталог"', async () => {
    await MenuPage.open()

    await MenuPage.clickCategory('Каталог')
    await CatalogPage.expectPageTitleIsDisplayed()
    await CatalogPage.expectUrlIs('http://pizzeria.skillbox.cc/product-category/catalog/')
  })

  it('TC03. Click category "Меню"', async () => {
    await MenuPage.open()

    await MenuPage.clickCategory('Меню')
    await MenuPage.expectPageTitleIsDisplayed()
    await MenuPage.expectUrlIs('http://pizzeria.skillbox.cc/product-category/menu/')
  })

  it('TC04. Click category "Напитки"', async () => {
    await MenuPage.open()

    await MenuPage.clickCategory('Напитки')
    await DrinksPage.expectPageTitleIsDisplayed()
    await DrinksPage.expectUrlIs('http://pizzeria.skillbox.cc/product-category/menu/drinks/')
  })

  it('TC05. Click category "Пицца"', async () => {
    await MenuPage.open()

    await MenuPage.clickCategory('Пицца')
    await PizzaPage.expectPageTitleIsDisplayed()
    await PizzaPage.expectUrlIs('http://pizzeria.skillbox.cc/product-category/menu/pizza/')
  })
})
