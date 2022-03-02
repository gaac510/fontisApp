function Product (name, price) {
  this.name = name
  this.price = price
};

function ShoppingCart () {
  this.productsInCart = {}
  this.totalPrice = 0
};

ShoppingCart.prototype.checkProductExist = function (productName) {
  return this.productsInCart[productName] !== undefined
}

ShoppingCart.prototype.checkProductQuantity = function (productName) {
  return this.productsInCart[productName].quantity
}

ShoppingCart.prototype.addNewProduct = function (product, quantity) {
  this.productsInCart[product.name] = product
  this.productsInCart[product.name].quantity = quantity
}

ShoppingCart.prototype.clearProduct = function (productName) {
  delete this.productsInCart[productName]
}

ShoppingCart.prototype.updateTotalPrice = function () {
  const listOfProducts = Object.values(this.productsInCart)
  this.totalPrice = listOfProducts.reduce((runningTotal, product) => {
    return runningTotal + product.price * product.quantity
  }, 0)
}

ShoppingCart.prototype.updateQuantity = function (productName, quantityChange) {
  this.productsInCart[productName].quantity += quantityChange
}

Product.prototype.addToCart = function (targetCart, quantity = 1) {
  const isNewToCart = targetCart.checkProductExist(this.name) === false
  if (isNewToCart) targetCart.addNewProduct(this, quantity)
  else targetCart.updateQuantity(this.name, quantity)
  targetCart.updateTotalPrice()
}

Product.prototype.removeFromCart = function (targetCart, quantity = 1) {
  const isNotInCart = targetCart.checkProductExist(this.name) === false
  if (isNotInCart) return false
  const isNotEnoughInCart = targetCart.checkProductQuantity(this.name) <= quantity
  if (isNotEnoughInCart) targetCart.clearProduct(this.name)
  else targetCart.updateQuantity(this.name, quantity * -1)
  targetCart.updateTotalPrice()
}

/*****************************************************************************/

const apple = new Product('Apple', 495)
const orange = new Product('Orange', 399)
const myCart1 = new ShoppingCart()
const myCart2 = new ShoppingCart()
const myCart3 = new ShoppingCart()
const myCart4 = new ShoppingCart()

apple.addToCart(myCart1, 2)
orange.addToCart(myCart1)
console.log(myCart1)
console.log(myCart1.totalPrice)

apple.addToCart(myCart2, 3)
apple.removeFromCart(myCart2)
console.log(myCart2)
console.log(myCart2.totalPrice)

apple.addToCart(myCart3, 3)
orange.addToCart(myCart3, 3)
apple.removeFromCart(myCart3, 5)
console.log(myCart3)
console.log(myCart3.totalPrice)

orange.addToCart(myCart4, 3)
apple.removeFromCart(myCart4, 5)
orange.removeFromCart(myCart4, 3)
console.log(myCart4)
console.log(myCart4.totalPrice)
