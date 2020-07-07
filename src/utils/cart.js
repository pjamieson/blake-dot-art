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

export const addToCart = (type, id) => {
  const cart = getCart()

  // Check for identifier already in Cart
  const indexOfItem = cart.findIndex(item =>
    item[1] === id
  )

  // If not there, add it
  if (indexOfItem === -1) {
    cart.push([type, id])
    setCart(cart)
  }
}
