import React, { useContext, useState, useEffect } from "react"
import Img from "gatsby-image"
import { Link, graphql } from "gatsby"
import ReactMarkdown from "react-markdown";

import { MDBBadge } from "mdbreact"

import { CartContext } from "../context/cart-context"

import Layout from "../components/layout"

import { getCardQtyAvailable } from "../utils/inventory"
import { formatPrice } from "../utils/format"

const Tradingcard = ({
  data: {
    p2020card: {
      id,
      identifier,
      project_2020_player: player,
      title,
      subtitle = {},
      limitation = {},
      image: { childImageSharp: { fluid }},
      description = {},
      details = {},
      qty: qtyAvail,
      price,
    },
  },
}) => {
  const { isInCart, addToCart } = useContext(CartContext)

  const itemType = "tradingcard"
  const qty = 1 //initialize with 1 of item
  const cartItem = {
    itemType,
    id,
    identifier,
    title,
    subtitle,
    fluid,
    qty,
    qtyAvail,
    price
  }
  const [inCart, setInCart] = useState(isInCart(cartItem))
  const [processing, setProcessing] = useState(false)

  // On loading page, confirm card is still available
  const [qtyAvailNow, setQtyAvailNow] = useState(0) // none available by default
  useEffect(() => {
    const fetchData = async () => {
      setProcessing(true)
      const avail = await getCardQtyAvailable(id)
      setQtyAvailNow(avail)
      setProcessing(false)
    }
    fetchData()
  }, [id])

  if (qtyAvailNow === 0 && inCart) {
    // remove from cart
    addToCart(cartItem, -1)
    setInCart(false)
  }

  return (
    <Layout>
      <div className="container page-container">
        <article className="p2020-card-details">
          <h1>{title} : Artist-Autographed Card</h1>
          <div className="uk-grid-small uk-child-width-1-2@s" uk-grid="masonry: true">
            <div>
              <div className="card" key={id}>
                <div className="view overlay">
                  <Img className="card card-img-top" fluid={fluid} alt={title} />
                </div>
                <div className="back-btn">
                  <Link to={`/merch/topps2020/`} state={{ player: player.name }} className="btn-floating btn-action btn-danger">
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
                        <button type="button" className="btn btn-add-to-cart btn-success btn-rounded" onClick={() => {
                          addToCart(cartItem, qty)
                          setInCart(true)
                        }}>
                          <i className="fas fa-cart-plus"></i>Add to Cart
                        </button>
                      }
                    </div>
                  }

                  { (qtyAvailNow > 0 && inCart) &&
                    <MDBBadge color="success">Added to Cart</MDBBadge>
                  }

                  { (qtyAvailNow > 0 && price <= 10) &&
                    <div className="inquire">
                      <button type="button" className="btn btn-inquire btn-info btn-rounded">
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
    p2020card: strapiTradingcard(identifier: {eq: $slug}) {
      id: strapiId
      identifier
      project_2020_player {
        name
      }
      title
      subtitle
      limitation
      image {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      description
      details
      qty
      price
    }
  }
`
