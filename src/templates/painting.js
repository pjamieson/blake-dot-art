import React, { useState, useContext } from "react"
import Img from "gatsby-image"
import { Link, graphql } from "gatsby"
import ReactMarkdown from "react-markdown";

import { CartContext } from "../context/cart-context"

import Layout from "../components/layout"

import { formatPrice } from "../utils/format"

import { MDBBadge } from "mdbreact"

const Painting = ({
  data: {
    painting: {
      id,
      identifier,
      title,
      image: { childImageSharp: { fluid }},
      subgenre,
      date = {},
      size = {},
      medium = {},
      description = {},
      price,
    },
  },
}) => {
  const { isInCart, addToCart } = useContext(CartContext)

  const itemType = "painting"
  const subtitle = "Origial Painting by Blake Jamieson"
  const qty = 1 //initialize with 1 of item
  const qtyAvail = 1 // there's only one of each painting available
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
        <article className="painting-details">
          <h1>{title}</h1>
          <div className="uk-grid-small uk-child-width-1-2@s" uk-grid="masonry: true">

            <div>
              <div className="card" key={identifier}>
                <div className="view overlay">
                  <Img className="card card-img-top" fluid={fluid} alt={title} />
                </div>
                <div className="back-btn">
                  <Link to={`/gallery/${subgenre.slug}`} className="btn-floating btn-action btn-danger">
                    <i className="fas fa-chevron-left"></i>
                  </Link>
                </div>
              </div>
            </div>

            <div className="buy-or-inquire">
              <div className="card-description">
                { (date && size) && <p>{date} - {size}</p> }
                { (!(date && size) && date) && <p>{date}</p> }
                { (!(date && size) && size) && <p>{size}</p> }

                { medium && <p>{medium}</p> }

                { description && <ReactMarkdown source={description} /> }

                { (price > 100) &&
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

                { (price <= 100) &&
                  <div className="inquire">
                    <button type="button" className="btn btn-inquire btn-info btn-rounded">Inquire</button>
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

export default Painting

export const query = graphql`
  query GetSinglePainting($slug: String) {
    painting: strapiPainting(slug: {eq: $slug}) {
      id: strapiId
      identifier
      title
      image {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      subgenre {
        slug
      }
      date
      size
      medium
      description
      price
    }
  }
`
