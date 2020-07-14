import React, { useContext, useState } from "react"
import Img from "gatsby-image"
import { Link, graphql } from "gatsby"
import ReactMarkdown from "react-markdown";

import { CartContext } from "../context/cart-context"

import Layout from "../components/layout"

import { formatPrice } from "../utils/format"

import { MDBBadge } from "mdbreact"

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

                { (price > 10) &&
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

                {inCart &&
                  <MDBBadge color="success">Added to Cart</MDBBadge>
                }

                { (price <= 10) && <div className="inquire">
                    <button type="button" className="btn btn-inquire btn-info btn-rounded">
                      Inquire
                    </button>
                  </div>
                }
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
