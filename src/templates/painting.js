import React, { useState, useContext, useEffect } from "react"
import { Helmet } from "react-helmet"
import Img from "gatsby-image"
import { Link, graphql } from "gatsby"
import ReactMarkdown from "react-markdown";

import { MDBBadge } from "mdbreact"

import { CartContext } from "../context/cart-context"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ImageSet from "../components/image-set"

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
      sport = {},
      date = {},
      size = {},
      medium = {},
      description = {},
      price,
      qty: qtyAvail,
      slug,
      portfolio,
    },
  },
}) => {
  const { isInCart, addToCart } = useContext(CartContext)

  const itemType = "painting"
  const subt = subtitle ? subtitle : "A Blake Jamieson Original"
  const qty = 1 //initialize with 1 of item
  const cartItem = {
    itemType,
    id,
    identifier,
    title,
    subtitle: subt,
    fluid,
    qty,
    qtyAvail,
    price
  }
  const [inCart, setInCart] = useState(isInCart(cartItem))
  const [processing, setProcessing] = useState(false)

  let imageset = []
  let imagendx = 0
  images.forEach(img => {
    imageset.push(
      {
        "key": imagendx,
        "title": title,
        "fluid": img.localFile.childImageSharp.fluid
      }
    )
    imagendx = imagendx + 1
  })
  //console.log("painting.js imageset", imageset)

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

  // Schema.org calculated values
  const productUrl = `https://blake.art/gallery/${subgenre.slug}/${slug}`
  //const productUrl = `localhost:8000/gallery/${subgenre.slug}/${slug}`
  //console.log("productUrl", productUrl)
  const productImageUrl = `https://blake.art${fluid.src}`
  //const productImageUrl = `localhost:8000${fluid.src}`
  //console.log("productImageUrl", productImageUrl)
  const productAvailability = qtyAvailNow > 0 ? "http://schema.org/InStock" : "http://schema.org/OutOfStock"

  return (
    <Layout>
      <SEO title={title} />

      <Helmet>
        <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Product",
            "productID": "${identifier}",
            "category": "Home & Garden > Decor > Artwork",
            "name": "${title}",
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
        <article className="painting-details">
          <h1>{title}</h1>
          <div className="uk-grid-small uk-child-width-1-2@s" uk-grid="masonry: true">

            <div>
              <div className="view overlay">
                <Img className="card card-img-top" fluid={fluid} alt={title} />
              </div>

              { (imageset.length > 0) &&
                <ImageSet imageset={imageset} />
              }

              { (qtyAvail > 0) &&
                <div className="back-btn">
                  <Link to={`/gallery/${subgenre.slug}`} className="btn-floating btn-action btn-primary">
                    <i className="fas fa-chevron-left"></i>
                  </Link>
                </div>
              }
              { (qtyAvail <= 0 && sport) &&
                <div className="back-btn">
                  <Link to={`/portfolio/${subgenre.slug}`} state={{ sport: sport.name }} className="btn-floating btn-action btn-primary">
                    <i className="fas fa-chevron-left"></i>
                  </Link>
                </div>
              }
              { (qtyAvail <= 0 && !sport) &&
                <div className="back-btn">
                  <Link to={`/portfolio/${subgenre.slug}`} className="btn-floating btn-action btn-primary">
                    <i className="fas fa-chevron-left"></i>
                  </Link>
                </div>
              }
            </div>

            <div className="buy-or-inquire">
              <div className="card-description">
                <h2>{subtitle && subtitle.length > 0 ? subtitle : "A Blake Jamieson Original"}</h2>

                { (date && size) && <p>{date} - {size}</p> }
                { (!(date && size) && date) && <p>{date}</p> }
                { (!(date && size) && size) && <p>{size}</p> }

                { medium && <p>{medium}</p> }

                { description && <ReactMarkdown source={description} /> }

                { (qty > 0 && processing) &&
                  <h3>Confirming availability...</h3>
                }

                <div className="detail-btns">
                  { (qtyAvail > 0 && qtyAvailNow <= 0) &&
                    <h3>Sorry, this piece is no longer available.</h3>
                  }

                  { (portfolio && qtyAvail === 0 && qtyAvailNow <= 0) &&
                    <h3>This piece has been sold or is Not for Sale.</h3>
                  }

                  { (price > 10 && qtyAvailNow > 0) &&
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

                  { (price <= 10 && qtyAvailNow > 0) &&
                    <div className="inquire">
                      <button type="button" className="btn btn-inquire btn-primary btn-rounded">Inquire</button>
                    </div>
                  }

                  { (inCart && qtyAvailNow > 0) &&
                    <MDBBadge color="secondary">Added to Cart</MDBBadge>
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
      images {
        localFile {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      subgenre {
        slug
      }
      sport {
        name
      }
      date
      size
      medium
      description
      price
      qty
      slug
      portfolio
    }
  }
`
