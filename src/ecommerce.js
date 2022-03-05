'use strict'

/*******************************************************************************
 *                                                                             *
 *                        The `Product` class                                  *
 *                 (Written using ES6 'class' syntax)                          *
 *                                                                             *
 ******************************************************************************/

/** Class representing a product. */
class Product {
  /**
   * Create a product.
   *
   * @param {string} name - The name of the product.
   * @param {number} price - The price of the product, in cents.
   */
  constructor (name, price) {
    Object.defineProperty(this, '_name', {
      value: name,
      enumerable: true
    }) /* This makes the `_name` property enumerable but immutable. This
    * (simple) programm assumes that products are uniquely identified by their
    * name and therefore shouldn't be modified.
    * */
    this.price = price
  };

  /**
   * @summary Add the product, in the specified quantity, to a target shopping
   * cart. The Product class has a dedicated 'add to cart' method since,
   * logically, the action starts with the product.
   *
   * @description Internally, this method calls the [addProduct]{@linkcode
   * ShoppingCart#addProduct} method of the {@linkcode ShoppingCart} class.
   * This way, except for one interface method, this method does not need to
   * care about how the shopping cart class is implemented.
   *
   * @param {ShoppingCart} targetCart - The shopping cart to which the product
   * is added.
   * @param {number} quantity - Optional. The number of products to add.
   * @return {Product} The calling object itself, to allow chaining.
   */
  addToCart (targetCart, quantity = 1) {
    targetCart.addProduct(this, quantity)
    return this // Returns self to allow chaining.
  }
}

/*******************************************************************************
*                          End of `Product` class                              *
*******************************************************************************/

/*******************************************************************************
 *                                                                             *
 *                        The `ShoppingCart` class                             *
 *            (Written following the traditional 'prototype' way)              *
 *                                                                             *
 ******************************************************************************/

/**
 * Represents a shopping cart. Requires no parameters and instances are created
 * as empty objects.
 *
 * @constructor
 */
function ShoppingCart () {}

/**
 * @summary Load a product into the shopping cart, and set the product
 * quantity to 0. If the product already exists in cart, it will be
 * overwritten. The opposite of [eraseProduct]{@linkcode
 * ShoppingCart#eraseProduct}.
 *
 * @description Note this will establish a 'live' connection to the supplied
 * product object, and any changes to the product (mainly its price) will be
 * reflected in the shopping cart.
 *
 * @param {Product} product - The product to be added.
 * @return {ShoppingCart} The calling object itself, to allow chaining.
 */
ShoppingCart.prototype.loadProduct = function (product) {
  this[product._name] = {}
  this[product._name].details = product /* This establishes a 'live' connection
  * to the product object.
  * */
  this[product._name].quantity = 0
  return this // Returns self to allow chaining.
}

/**
 * Erases all traces of a product from the shopping cart. The opposite
 * of [loadProduct]{@linkcode ShoppingCart#loadProduct}.
 *
 * @param {Product} product - The product to be erased.
 * @return {ShoppingCart} The calling object itself, to allow chaining.
 */
ShoppingCart.prototype.eraseProduct = function (product) {
  delete this[product._name]
  return this // Returns self to allow chaining.
}

/**
 * Get the total price of all products in cart.
 *
 * @param {boolean} inDollars - Optional. Defaults to false. If true, display
 * the amount in dollars, otherwise in cents.
 * @return {number} Total price in dollars or in cents.
 */
ShoppingCart.prototype.getTotalPrice = function (inDollars = false) {
  const listOfProducts = Object.values(this)
  const totalPrice = listOfProducts.reduce((runningTotal, product) => {
    return runningTotal + product.details.price * product.quantity
  }, 0)
  if (inDollars) return (totalPrice / 100)
  return totalPrice
}

/**
 * Change the quantity of a product by the specified amount.
 *
 * @param {Product} product - The product of which quantity is to change.
 * @param {number} changeAmount - The change amount. Should be an integer,
 * positive or negative.
 * @return {ShoppingCart} The calling object itself, to allow chaining.
 */
ShoppingCart.prototype.changeProductQuantity = function (product, changeAmount) {
  this[product._name].quantity += changeAmount
  return this // Return self to allow chaining.
}

/**
 * Add a product, in the specified quantity, to cart.
 *
 * @param {Product} product - The product to add.
 * @param {number} quantity - Optional. Defaults to 1. How many of the product
 * to add.
 * @return {ShoppingCart} The calling object itself, to allow chaining.
 */
ShoppingCart.prototype.addProduct = function (product, quantity = 1) {
  const notHaveTheProduct = this[product._name] === undefined
  if (notHaveTheProduct) this.loadProduct(product) /* If the product isn't
  * already present in cart, needs to load it first.
  * */
  this.changeProductQuantity(product, quantity)
  return this // Return self to allow chaining.
}

/**
 * Remove a product, in the specified quantity, from cart.
 *
 * @param {Product} product - The product to remove.
 * @param {number} quantity - Optional. Defaults to 1. How many of the product
 * to remove.
 * @return {ShoppingCart} The calling object itself, to allow chaining.
 */
ShoppingCart.prototype.removeProduct = function (product, quantity = 1) {
  const notHaveTheProduct = this[product._name] === undefined
  if (notHaveTheProduct) return this /* If the product isn't present in cart,
  * do nothing, and return self to allow chaining.
  * */
  const removingLessThanThereIs = quantity < this[product._name].quantity
  if (removingLessThanThereIs) this.changeProductQuantity(product, quantity * -1) /*
  * If the removal amount isn't enought to remove all of the product, decrease
  * the quantity by the amount...
  * */
  else this.eraseProduct(product) /* ... else, simply erase the product from
  * cart.
  * */
  return this // Return self to allow chaining.
}

/*******************************************************************************
*                       End of `ShoppingCart` class                            *
*******************************************************************************/

module.exports = {
  Product,
  ShoppingCart
}
