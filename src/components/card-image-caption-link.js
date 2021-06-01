import React from "react";
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { formatPrice } from "../utils/format"

const CardImageCaptionLink = ({ item, caption_format }) => {
  //console.log("CardImageCaptionLink item", item)

  // Use the primary image, the first of the images set
  const image = item.image ? getImage(item.image.localFile.childImageSharp.gatsbyImageData) : getImage(item.images[0].localFile.childImageSharp.gatsbyImageData)

  let series = ""
  let line2 = ""
  let line3 = ""
  let link = ""

  if (caption_format === "Card") {
    if (item.project_2020_player) {
      series = "project2020"
    } else if (item.topps_1951_player) {
      series = "1951"
    } else if (item.project_70_player) {
      series = "project70"
    }
  }

  if (caption_format === "Gallery" || caption_format === "Portfolio") {
    line2 = item.subtitle && item.subtitle.length > 0 ? item.subtitle : "A Blake Jamieson Original"
    line3 = formatPrice(item.price)
    link = `/${(item.qty > 0 ? 'gallery' : 'portfolio')}/${item.subgenre.slug}/${item.slug}/`
  } else if (caption_format === "Card") {
    line2 = item.subtitle && item.subtitle.length > 0 ? item.subtitle : "A Sports Art Card"
    line3 = item.limitation
    link = `/topps/${series}/${item.identifier}`
  } else if (caption_format === "Product") {
    line2 = item.subtitle && item.subtitle.length > 0 ? item.subtitle : ""
    link = `/product/${item.product_category.slug}/${item.identifier}`
  }

  const doLink = ((caption_format === "Card" && item.qty < 1)
    || (caption_format === "Product" && item.qty < 1)) ? false : true

  return (
    <div className="card" key={item.id}>
      { (doLink) &&
        <div className="card img-hover-zoom">
          <a href={link} className="ripple">
            <GatsbyImage className="img-fluid rounded" image={image} alt={item.title} />
          </a>
        </div>
      }
      { (!doLink) &&
        <>
          <GatsbyImage className="img-fluid rounded" image={image} alt={item.title} />
          <button type="button" className="btn btn-sold btn-primary btn-rounded">Sold Out</button>
        </>
      }

      { (doLink || (caption_format === "Card" && item.qty > 0)) &&
        <div>
          <Link to={link} className="btn-floating btn-action btn-primary">
            <i className="fas fa-chevron-right pl-1"></i>
          </Link>
        </div>
      }

      <div className="card-body">
        <h4 className="card-title">{item.title}</h4>
        <h5 className="card-subtitle">{line2}</h5>
        { ((caption_format !== "Portfolio") && (caption_format !== "Product")) &&
          <h5>{line3}</h5>
        }
      </div>
    </div>
  )
}

export default CardImageCaptionLink;
