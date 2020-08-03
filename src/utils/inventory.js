// Functions to get and set inventory availability

export const isPaintingAvailable = async (id) => {
  try {
    const response = await fetch(`${process.env.GATSBY_STRAPI_API_URL}/paintings/${id}`)
    const data = await response.json()
    return (data.available)
  } catch (err) {
    console.log('isPaintingAvailable err', err)
  }
  return false
}

export const setPaintingAvailable = async (id, avail) => {
    try {
      await fetch(`${process.env.GATSBY_STRAPI_API_URL}/paintings/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: `{"available":${avail}}`
      })
      //const data = await resp.json()
      //console.log("checkout put painting data", data)
    } catch (err) {
      console.log("inventory setPaintingAvailable err", err)
    }
}

export const getCardQtyAvailable = async (id) => {
  try {
    const response = await fetch(`${process.env.GATSBY_STRAPI_API_URL}/tradingcards/${id}`)
    const data = await response.json()
    return (data.qty)
  } catch (err) {
    console.log('getCardQtyAvailable err', err)
  }
  return 0
}

export const setCardQtyAvailable = async (id, qty) => {
    try {
      await fetch(`${process.env.GATSBY_STRAPI_API_URL}/tradingcards/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: `{"qty":${qty}}`
      })
      //const data = await resp.json()
      //console.log("checkout put tradingcard data", data)
    } catch (err) {
      console.log("inventory setCardQtyAvailable err", err)
    }
}
