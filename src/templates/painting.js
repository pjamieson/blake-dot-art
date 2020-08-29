import React, { useState, useContext, useEffect } from "react"
import Img from "gatsby-image"
import { Link, graphql } from "gatsby"
import ReactMarkdown from "react-markdown";

import { MDBBadge } from "mdbreact"

import { CartContext } from "../context/cart-context"

import Layout from "../components/layout"
import SEO from "../components/seo"
//import GalleryCarouselComponent from "../components/gallery-carousel"

import { getPaintingQtyAvailable } from "../utils/inventory"
import { formatPrice } from "../utils/format"

const Painting = ({
  data: {
    painting: {
      id,
      identifier,
      title,
      subtitle,
      image: { childImageSharp: { fluid }},
      images = {},
      subgenre,
      date = {},
      size = {},
      medium = {},
      description = {},
      price,
      qty: qtyAvail,
      portfolio,
    },
  },
}) => {
  const { isInCart, addToCart } = useContext(CartContext)

  const itemType = "painting"
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

  // On loading page, confirm painting is still available
  const [qtyAvailNow, setQtyAvailNow] = useState(1) // one available by default
  useEffect(() => {
    const fetchData = async () => {
      setProcessing(true)
      setQtyAvailNow(await getPaintingQtyAvailable(id))
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
      <SEO title={title} />
      <div className="container page-container">
        <article className="painting-details">
          <h1>{title}</h1>
          <div className="uk-grid-small uk-child-width-1-2@s" uk-grid="masonry: true">

            <div>
              <div className="card" key={identifier}>
                <div className="view overlay">
                  <Img className="card card-img-top" fluid={fluid} alt={title} />
                </div>
                { (qtyAvail > 0) &&
                  <div className="back-btn">
                    <Link to={`/gallery/${subgenre.slug}`} className="btn-floating btn-action btn-danger">
                      <i className="fas fa-chevron-left"></i>
                    </Link>
                  </div>
                }
                { (qtyAvail <= 0) &&
                  <div className="back-btn">
                    <Link to={`/portfolio/${subgenre.slug}`} className="btn-floating btn-action btn-primary">
                      <i className="fas fa-chevron-left"></i>
                    </Link>
                  </div>
                }
              </div>
            </div>

            <div className="buy-or-inquire">
                <div className="card-description">
                {/* (images && images.length > 0) &&
                  <GalleryCarouselComponent images={images} />
                */}

                <h3>{subtitle && subtitle.length > 0 ? subtitle : "Original Painting by Blake Jamieson"}</h3>

                { (date && size) && <p>{date} - {size}</p> }
                { (!(date && size) && date) && <p>{date}</p> }
                { (!(date && size) && size) && <p>{size}</p> }

                { medium && <p>{medium}</p> }

                { description && <ReactMarkdown source={description} /> }

                { (qty > 0 && processing) &&
                  <h3>Confirming availability...</h3>
                }

                <div className="detail-btns">
                  { (qty > 0 && qtyAvail <= 0) &&
                    <h3>Sorry, this piece is no longer available.</h3>
                  }

                  { (portfolio && qty === 0 && qtyAvail <= 0) &&
                    <h3>This piece has been sold or is Not for Sale.</h3>
                  }

                  { (price > 10 && qtyAvail > 0) &&
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

                  { (price <= 10 && qtyAvail > 0) &&
                    <div className="inquire">
                      <button type="button" className="btn btn-inquire btn-primary btn-rounded">Inquire</button>
                    </div>
                  }

                  { (inCart && qtyAvail > 0) &&
                    <MDBBadge color="success">Added to Cart</MDBBadge>
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

export default Painting

export const query = graphql`
  query GetSinglePainting($slug: String) {
    painting: strapiPainting(slug: {eq: $slug}) {
      id: strapiId
      identifier
      title
      subtitle
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
      qty
      portfolio
    }
  }
`
