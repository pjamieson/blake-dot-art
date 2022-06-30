// Template for Tradingcard detail pages - created in gatsby-node.js

import React, { useContext, useState, useEffect } from "react"
import { Helmet } from "react-helmet"

import { Link, navigate, graphql } from "gatsby"
import ReactMarkdown from "react-markdown";

import { MDBBadge } from "mdb-react-ui-kit"

import { CartContext } from "../context/cart-context"

import ImageSet from "../components/image-set"
import Layout from "../components/layout"
import Seo from "../components/seo"

import { formatPrice } from "../utils/format"
import { getImageUrl } from "../utils/image-url"
import { getCardQtyAvailable } from "../utils/inventory"

const Tradingcard = ({
  data: {
    tradingcard: {
      id,
      sku,
      project_2020_player = {},
      topps_1951_player = {},
      project_70_player = {},
      title,
      subtitle = {},
      limitation = {},
      image,
      image2 = {},
      description = {},
      details = {},
      qty: qtyAvail,
      price,
    },
  },
}) => {
  const { isInCart, addToCart } = useContext(CartContext)

  let series = ""
  if (project_2020_player) series = `project2020`
  if (topps_1951_player) series = `1951`
  if (project_70_player) series = `project70`

  let player = ""
  if (project_2020_player) player = project_2020_player.name
  if (topps_1951_player) player = topps_1951_player.name
  if (project_70_player) player = project_70_player.name

  const itemType = "tradingcard"
  const qty = 1 //initialize with 1 of item
  const item_slug = `/topps/${series}/${sku}/`
  const cartItem = {
    itemType,
    id,
    identifier: sku,
    item_slug,
    title,
    subtitle,
    image,
    imageUrl: getImageUrl(image, "small"),
    qty,
    qtyAvail,
    price
  }
  const [inCart, setInCart] = useState(isInCart(cartItem))
  const [processing, setProcessing] = useState(false)

  // On loading page, confirm card is still available
  const [qtyAvailNow, setQtyAvailNow] = useState(1) // one available by default
  useEffect(() => {
    const fetchData = async () => {
      setProcessing(true)
      setQtyAvailNow(await getCardQtyAvailable(id))
      setProcessing(false)
    }
    fetchData()
  }, [id])

  if (qtyAvailNow === 0 && inCart) {
    // remove from cart
    addToCart(cartItem, -1)
    setInCart(false)
  }

  // Schema.org calculated values
  const seo_description = `Images of and details about the trading card “${title}” by Blake Jamieson.`
  const productTitle = `${title} : Artist-Autographed Card`
  const productUrl = `https://blake.art${item_slug}`
  const productImageUrl = getImageUrl(image, "small")
  const productAvailability = qtyAvailNow > 0 ? "http://schema.org/InStock" : "http://schema.org/OutOfStock"

  return (
    <Layout>
      <Seo title={title} description={seo_description} />
      <Helmet>
        <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Product",
            "productID": "${sku}",
            "sku": "${sku}",
            "identifier_exists": "false",
            "category": "Arts & Entertainment > Hobbies & Creative Arts > Collectibles > Collectible Trading Cards",
            "name": "${productTitle}",
            "description": "${subtitle}",
            "url": "${productUrl}",
            "image": "${productImageUrl}",
            "brand": {
              "@type": "Brand"
              "name": "Blake Jamieson"
            },
            "logo": "https://blake.art/icons/icon-72x72.png",
            "offers": [
              {
                "@type": "Offer",
                "price": "${price}",
                "priceCurrency": "USD",
                "itemCondition": "https://schema.org/NewCondition",
                "availability": "${productAvailability}"
              }
            ]
          }
        `}
        </script>
      </Helmet>

      <div className="page-container">
        <article className="item-details">
          <h1>{title} : Artist-Autographed Card</h1>
          <div className="details-container">
            <div className="item-gallery">

              <ImageSet title={title} subtitle={subtitle} image={image} images={[image2]} />

              <div className="back-btn">
                <Link to={`/topps/${series}/`} state={{ player: player }} className="btn-floating btn-action btn-primary">
                  <i className="fas fa-chevron-left"></i>
                </Link>
              </div>

              <aside className="card-details">
                <ReactMarkdown source={details} />
              </aside>

            </div> {/* item-gallery */}

            <div className="item-description">
              <div className="details">
                <h2 className="padded-header">
                  {subtitle && subtitle.length > 0 ? subtitle : "A Blake Jamieson Original"}
                </h2>

                { description && <ReactMarkdown source={description} /> }

                { (qty > 0 && processing) &&
                  <h3>Confirming availability...</h3>
                }
                <div className="inventory-msg">
                  { (qtyAvail > 0 && qtyAvailNow <= 0) &&
                    <h3>Sorry, this card is no longer available.</h3>
                  }

                  { (qtyAvail === 0 && qtyAvailNow <= 0) &&
                    <h3>This card has been sold or is Not for Sale.</h3>
                  }
                </div>
              </div> {/* details */}
              <div className="price-action">
                {qtyAvail > 0 && qtyAvailNow > 0 &&
                  <h3 className="price">{formatPrice(price)}</h3>
                }
                <div>
                  { (price > 10 && qtyAvail > 0 && qtyAvailNow > 0 && !inCart) &&
                    <button type="button" className="btn btn-add-to-cart btn-primary btn-rounded" onClick={() => {
                      addToCart(cartItem, qty)
                      setInCart(true)
                    }}>
                      <i className="fas fa-cart-plus"></i>Add to Cart
                    </button>
                  }
                  { (inCart && qtyAvailNow > 0) &&
                    <MDBBadge color="secondary">Added to Cart</MDBBadge>
                  }
                </div>
                { !inCart &&
                  <div className="inquire">
                    <button type="button" className="btn btn-inquire btn-primary btn-rounded" onClick={() => {
                      navigate('/inquire/', {
                        state: {
                          title,
                          sku,
                          image_src: productImageUrl
                        }
                      })
                    }}>Inquire</button>
                  </div>
                }
              </div> {/* price-action */}
            </div> {/* item-description */}
          </div> {/* details-container */}
        </article> {/* item-details */}
      </div> {/* page-container */}
    </Layout>
  )
}

/*
                  { (qtyAvailNow > 0 && price > 10) &&
                    <div className="add-to-cart">
                      <h3 className="price">{formatPrice(price)}</h3>
                      {!inCart &&
                        <button type="button" className="btn btn-add-to-cart btn-primary btn-rounded" onClick={() => {
                          addToCart(cartItem, qty)
                          setInCart(true)
                        }}>
                          <i className="fas fa-cart-plus"></i>Add to Cart
                        </button>
                      }
                    </div>
                  }

                  { (qtyAvailNow > 0 && inCart) &&
                    <MDBBadge color="secondary">Added to Cart</MDBBadge>
                  }

                  { (qtyAvailNow > 0 && price <= 10) &&
                    <div className="inquire">
                      <button type="button" className="btn btn-inquire btn-secondary btn-rounded">
                        Inquire
                      </button>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </Layout>
  )
}
*/
export default Tradingcard

export const query = graphql`
  query GetSingleTradingcard($slug: String) {
    tradingcard: strapiTradingcard(
      identifier: {eq: $slug}) {
      id: strapiId
      sku: identifier
      project_2020_player {
        name
      }
      topps_1951_player {
        name
      }
      project_70_player {
        name
      }
      title
      subtitle
      limitation
      image {
        formats {
          large {
            url
          }
          medium {
            url
          }
          small {
            url
          }
          thumbnail {
            url
          }
        }
        height
        localFile {
          publicURL
        }
        width
        url
      }
      image2 {
        formats {
          large {
            url
          }
          medium {
            url
          }
          small {
            url
          }
          thumbnail {
            url
          }
        }
        height
        localFile {
          publicURL
        }
        width
        url
      }
      description
      details
      qty
      price
    }
  }
`
