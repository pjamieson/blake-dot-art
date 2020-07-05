import React from 'react';
import { Link } from "gatsby"
import Image from "gatsby-image"

const CardImageLinkTitle = ({ card }) => {
  const link = `/${(card.available ? 'gallery' : 'portfolio')}/${card.subgenre.slug}/${card.slug}`
  return (
    <div className="card" key={card.identifier}>

      <div className="view overlay">
        <div>
          <Image className="card-img-top" fluid={card.image.childImageSharp.fluid} alt={card.title} />
          <Link to={link}>
            <div className="mask rgba-white-slight"></div>
          </Link>
        </div>
      </div>

      <div>
        <Link to={link} className="btn-floating btn-action btn-success">
          <i className="fas fa-chevron-right pl-1"></i>
        </Link>
      </div>

      <div className="card-body">
        <h4 className="card-title">{card.title}</h4>
      </div>

    </div>
  )
}

export default CardImageLinkTitle;
