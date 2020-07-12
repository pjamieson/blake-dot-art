export const setCart = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart))
}

export const getCart = () => {
  try {
    const cart = JSON.parse(localStorage.getItem('cart'))
    if (cart) {
      return cart
    }
  } catch(err) {
    // intentionally empty
  }
  return []
}

export const addToCart = (cartItem, qty = 1) => {
  const cart = getCart()

  // Check for identifier already in Cart
  const indexOfItem = cart.findIndex(item =>
    item.identifier === cartItem.identifier
  )

  // If item not already in cart, add it
  if (indexOfItem === -1) {
    cartItem.qty = parseInt(qty)
    cart.push(cartItem)
  }
  setCart(cart)
}

export const updateCart = (cartItem, qty) => {
  const cart = getCart()

  // Find identifier in Cart
  const indexOfItem = cart.findIndex(item =>
    item.identifier === cartItem.identifier
  )

  if (indexOfItem !== -1 && cart[indexOfItem].qty <= 0) {
    // safety
    cart.splice(indexOfItem, 1)
  } else if (indexOfItem !== -1) {
    // Update qty
    cart[indexOfItem].qty += parseInt(qty)
  }

  if (cart[indexOfItem].qty <= 0) {
    // Remove item from cart
    cart.splice(indexOfItem, 1)
  }

  setCart(cart)
}

export const cartSubtotal = (cart) => {
  const subtotal = cart.reduce((counter, item) => {
    return counter + item.price * item.qty
  }, 0)
  return subtotal
}
