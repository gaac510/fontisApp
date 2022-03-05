'use strict'

const assert = require('assert').strict
const { Product, ShoppingCart } = require('../src/ecommerce')

describe('fontis eCommerce app test suit', function () {
  // Create test products. Prices are supplied in cents.
  const apple = new Product('Apple', 495)
  const orange = new Product('Orange', 399)

  describe('Test case 1', function () {
    it('Total price should equal $13.89', function () {
      const myCart = new ShoppingCart() // Create a shopping cart.
      apple.addToCart(myCart, 2) // Add two apples to cart.
      orange.addToCart(myCart) // Add one oranges to cart.

      assert.equal(myCart.getTotalPrice(true), 13.89)
    })
  })

  describe('Test case 2', function () {
    it('Total price should equal $9.9', function () {
      const myCart = new ShoppingCart() // Create a shopping cart.
      apple.addToCart(myCart, 3) // Add three apples to cart.
      myCart.removeProduct(apple) // Remove 1 apple from cart.

      assert.equal(myCart.getTotalPrice(true), 9.9)
    })
  })
})
