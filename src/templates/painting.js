// Template for Painting detail pages - created in gatsby-node.js

import React, { useState, useContext, useEffect } from "react"
import { Helmet } from "react-helmet"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Link, graphql } from "gatsby"
import ReactMarkdown from "react-markdown";

import { MDBBadge } from "mdbreact"

import { CartContext } from "../context/cart-context"

import Layout from "../components/layout"
import Seo from "../components/seo"
import ImageSet from "../components/image-set"

import { getPaintingQtyAvailable } from "../utils/inventory"
import { formatPrice } from "../utils/format"

const PaintingPage = ({
  data: {
    painting: {
      id,
      identifier,
      title,
      subtitle,
      image,
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

  //console.log("painting.js images", images)
  let imageset = []
  let key = 0
  images.forEach(img => {
    imageset.push({
      key,
      title,
      "url": img.url,
      "gatsbyImage": getImage(img.localFile.childImageSharp.gatsbyImageData)
    })
    key = key + 1
  })
  //console.log("painting.js imageset", imageset)

  const itemType = "painting"
  const subt = subtitle ? subtitle : "A Blake Jamieson Original"
  const qty = 1 //initialize with 1 of item
  const item_slug = `/gallery/${subgenre.slug}/${slug}/`
  const cartItem = {
    itemType,
    id,
    identifier,
    title,
    subtitle: subt,
    image,
    url: image.url,
    qty,
    qtyAvail,
    price,
    item_slug
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

  const seo_description = `Images of and details about the original painting “${title}” by Blake Jamieson.`
  //console.log("painting.js seo_description", seo_description)

  // Schema.org calculated values
  const productUrl = `https://blake.art${item_slug}`
  //const productUrl = `localhost:8000/gallery/${subgenre.slug}/${slug}`
  //console.log("productUrl", productUrl)

  const productImageUrl = image.localFile.url
  //console.log("painting.js productImageUrl", productImageUrl)

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
            "productID": "${identifier}",
            "category": "Home & Garden > Decor > Artwork",
            "name": "${title}",
            "description": "${subtitle ? subtitle : `A Blake Jamieson Original Painting`}",
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
          <h1>{title}</h1>
          <div className="uk-grid-small uk-child-width-1-2@s" uk-grid="masonry: true">

            <div>
              <div className="">
                <GatsbyImage className="img-fluid rounded" image={getImage(image.localFile.childImageSharp.gatsbyImageData)} alt={title} />
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

export default PaintingPage

export const query = graphql`
  query GetSinglePainting($slug: String) {
    painting: strapiPainting(slug: {eq: $slug}) {
      id: strapiId
      identifier
      title
      subtitle
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
      images {
        localFile {
          childImageSharp {
            gatsbyImageData(
              width: 600
              placeholder: BLURRED
              formats: [AUTO, WEBP]
            )
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
