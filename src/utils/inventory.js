// Get and set Painting & Tradingcard availability

export const isPaintingAvail = async (id) => {
  try {
    const response = await fetch(`${process.env.GATSBY_STRAPI_API_URL}/paintings/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await response.json()
    return data.available
  } catch(err) {
    // intentionally empty
  }
  return false
}
