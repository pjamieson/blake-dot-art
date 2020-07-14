export const SALES_TAX_RATE = process.env.SALES_TAX_RATE || 0.00

export const saveCart = (cart) => {
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

// Functions below repliacted in blake-strapr/config/functions/cart.js
// A private Node package that both projects use would be a better solution

export const cartSubtotal = (cart) => {
  const subtotal = cart.reduce((counter, item) => {
    return counter + item.price * item.qty
  }, 0)

  return subtotal
}

export const cartTotal = (cart) => {
  const subtotal = cartSubtotal(cart)
  const total = subtotal + (subtotal * SALES_TAX_RATE)

  return total
}
