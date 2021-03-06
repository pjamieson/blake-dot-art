// Template for Tradingcard detail pages - created in gatsby-node.js

import React, { useContext, useState, useEffect } from "react"
import { Helmet } from "react-helmet"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link, graphql } from "gatsby"
import ReactMarkdown from "react-markdown";

import { MDBBadge } from "mdbreact"

import { CartContext } from "../context/cart-context"

import Layout from "../components/layout"
import Seo from "../components/seo"

import { getCardQtyAvailable } from "../utils/inventory"
import { formatPrice } from "../utils/format"

const Tradingcard = ({
  data: {
    tradingcard: {
      id,
      identifier,
      project_2020_player = {},
      topps_1951_player = {},
      project_70_player = {},
      title,
      subtitle = {},
      limitation = {},
      image,
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
  const item_slug = `/topps/${series}/${identifier}/`
  const cartItem = {
    itemType,
    id,
    identifier,
    title,
    subtitle,
    image,
    qty,
    qtyAvail,
    price,
    item_slug
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
  const productTitle = `${title} : Artist-Autographed Card`

  const productUrl = `https://blake.art${item_slug}`

  const productImageUrl = image.localFile.url
  //console.log("tradingcard.js productImageUrl", productImageUrl)

  const productAvailability = qtyAvailNow > 0 ? "http://schema.org/InStock" : "http://schema.org/OutOfStock"

  return (
    <Layout>
      <Seo title={title} />

      <Helmet>
        <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Product",
            "productID": "${identifier}",
            "category": "Arts & Entertainment > Hobbies & Creative Arts > Collectibles > Collectible Trading Cards",
            "name": "${productTitle}",
            "description": "${subtitle}",
            "url": "${productUrl}",
            "image": "${productImageUrl}",
            "brand":"Blake Jamieson",
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

      <div className="container page-container">
        <article className="item-details">
          <h1>{title} : Artist-Autographed Card</h1>
          <div className="uk-grid-small uk-child-width-1-2@s" uk-grid="masonry: true">
            <div>
              <div className="card" key={id}>
                <GatsbyImage className="img-fluid rounded" image={image.localFile.childImageSharp.gatsbyImageData} alt={title} />
                <div className="back-btn-card">
                  <Link to={`/topps/${series}/`} state={{ player: player }} className="btn-floating btn-action btn-danger">
                    <i className="fas fa-chevron-left"></i>
                  </Link>
                </div>
              </div>
              <aside className="card-details">
                <ReactMarkdown source={details} />
              </aside>
            </div>
            <div className="buy-or-inquire">
              <div className="card-description">
                <h2>{subtitle}</h2>
                <ReactMarkdown source={description} />

                { (processing) &&
                  <h3>Confirming availability...</h3>
                }

                <div className="detail-btns">
                  { (qtyAvailNow === 0) &&
                    <h3>Sorry, this card is no longer available.</h3>
                  }

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

export default Tradingcard

export const query = graphql`
  query GetSingleTradingcard($slug: String) {
    tradingcard: strapiTradingcard(
      identifier: {eq: $slug}) {
      id: strapiId
      identifier
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
        localFile {
          childImageSharp {
            gatsbyImageData(
              width: 600
              placeholder: BLURRED
              formats: [AUTO, WEBP]
            )
          }
          url
        }
      }
      description
      details
      qty
      price
    }
  }
`
