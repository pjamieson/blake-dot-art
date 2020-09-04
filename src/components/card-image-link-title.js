import React from 'react';
import { Link } from "gatsby"
import Img from "gatsby-image"

import { formatPrice } from "../utils/format"

const CardImageLinkTitle = ({ card }) => {
  //console.log("card", card)
  const link = `/${(card.qty > 0 ? 'gallery' : 'portfolio')}/${card.subgenre.slug}/${card.slug}`
  const subtitle = (card.subtitle && card.subtitle.length > 0 ? card.subtitle : 'A Blake Jamieson Original')
  return (
    <div className="card" key={card.identifier}>

      <div className="view overlay">
        <div>
          <Img className="card-img-top" fluid={card.image.childImageSharp.fluid} alt={card.title} />
          <Link to={link}>
            <div className="mask rgba-white-slight"></div>
          </Link>
        </div>
      </div>

      <div>
        <Link to={link} className="btn-floating btn-action btn-primary">
          <i className="fas fa-chevron-right pl-1"></i>
        </Link>
      </div>

      <div className="card-body">
        <h3>{card.title}</h3>
        { (card.qty > 0) && <div>
            <h4 className="card-subtitle">{subtitle}</h4>
            <h4>{formatPrice(card.price)}</h4>
          </div>
        }
      </div>

    </div>
  )
}

export default CardImageLinkTitle;
