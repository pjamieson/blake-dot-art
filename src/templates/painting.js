// Template for Painting detail pages - created in gatsby-node.js

import React, { useState, useContext, useEffect } from "react"
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
import { getPaintingQtyAvailable } from "../utils/inventory"

const PaintingPage = ({
  data: {
    painting: {
      id,
      sku,
      title,
      subtitle = {},
      image = {},
      images = {},
      subgenre = {},
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
  const item_slug = `/gallery/${subgenre.slug}/${slug}/`
  const cartItem = {
    itemType,
    id,
    identifier: sku,
    item_slug,
    title,
    subtitle: subt,
    image,
    imageUrl: getImageUrl(image, "small"),
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

  // Schema.org calculated values
  const seo_description = `Images of and details about the original painting “${title}” by Blake Jamieson.`
  const productUrl = `https://blake.art${item_slug}`
  const productImageUrl = (image ? getImageUrl(image, "small") : (images[0] ? getImageUrl(images[0], "small") : ""))
  const productAvailability = qtyAvailNow > 0 ? "http://schema.org/LimitedAvailability" : "http://schema.org/SoldOut"

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
            "category": "Home & Garden > Decor > Artwork",
            "name": "${title}",
            "description": "${subt}",
            "url": "${productUrl}",
            "image": [
              "${productImageUrl}"
            ],
            "brand": {
              "@type": "Brand"
              "name": "Blake Jamieson"
            },
            "logo": "https://blake.art/icons/icon-72x72.png",
            "offers": [
              {
                "@type": "Offer",
                "url": "${productUrl}",
                "priceCurrency": "USD",
                "price": "${price}",
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
          <h1>{title}</h1>
          <div className="details-container">
            <div className="item-gallery">

              <ImageSet title={title} subtitle={subt} image={image} images={images} />

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
            </div> {/* item-gallery */}

            <div className="item-description">
              <div className="details">
                <h2 className="padded-header">
                  {subtitle && subtitle.length > 0 ? subtitle : "A Blake Jamieson Original"}
                </h2>

                { (date && size) && <p>{date} - {size}</p> }
                { (!(date && size) && date) && <p>{date}</p> }
                { (!(date && size) && size) && <p>{size}</p> }

                { medium && <p>{medium}</p> }

                { description && <ReactMarkdown source={description} /> }

                { (qty > 0 && processing) &&
                  <h3>Confirming availability...</h3>
                }
                <div className="inventory-msg">
                  { (qtyAvail > 0 && qtyAvailNow <= 0) &&
                    <h3>Sorry, this piece is no longer available.</h3>
                  }

                  { (qtyAvail === 0 && qtyAvailNow <= 0) &&
                    <h3>This piece has been sold or is Not for Sale.</h3>
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

export default PaintingPage

export const query = graphql`
  query GetSinglePainting($slug: String) {
    painting: strapiPainting(slug: {eq: $slug}) {
      id: strapiId
      sku: identifier
      title
      subtitle
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
      images {
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
