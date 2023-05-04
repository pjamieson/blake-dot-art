import React from "react";
import { Link } from "gatsby"

import { formatPrice } from "../utils/format"
import { getImageUrl } from "../utils/image-url"

const CardImageCaptionLink = ({ item, caption_format }) => {
  //console.log("CardImageCaptionLink item", item)

  // Use the primary image, the first of the images set
  const image_url = ( item.image ? getImageUrl(item.image, "medium") : ( item.images[0] ? getImageUrl(item.images[0], "medium") : "" ) )

  let series = ""
  let line2 = ""
  let line3 = ""
  let link = ""
  let alt_text = ""

  if (caption_format === "Card") {
    if (item.project_2020_player) {
      series = "project2020"
      if (item.project_2020_player.order > 50) {
        series = "starwars"
      }
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
    alt_text = `The artwork ${item.title} by Blake Jamieson`
  } else if (caption_format === "Card") {
    line2 = item.subtitle && item.subtitle.length > 0 ? item.subtitle : "A Sports Art Card"
    line3 = item.limitation
    link = `/topps/${series}/${item.identifier}`
    alt_text = `The card ${item.title} by Blake Jamieson`
  } else if (caption_format === "Product") {
    line2 = item.subtitle && item.subtitle.length > 0 ? item.subtitle : ""
    link = `/product/${item.product_category.slug}/${item.identifier}`
    alt_text = `The item ${item.title} from Blake Jamieson`
  }

  const doLink = ((caption_format === "Card" && item.qty < 1)
    || (caption_format === "Product" && item.qty < 1)) ? false : true

  return (
    <div className="card" key={item.id}>
      { (doLink) &&
        <div className="card img-hover-zoom">
          <a href={link} className="ripple">
            <img className="img-fluid" src={image_url} alt={alt_text} />
          </a>
        </div>
      }
      { (!doLink) &&
        <>
          <img className="img-fluid" src={image_url} alt={alt_text} />
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
