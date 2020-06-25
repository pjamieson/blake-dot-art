import React from 'react';
import { Link } from "gatsby"
import Image from "gatsby-image"

const CardImagelink = ({ location, card }) => {
  const menu = card.available ? 'gallery' : 'portfolio'
  const link = `/${menu}/${card.subgenre.slug}/`
  return (
    <div className="card" key={card.identifier}>
      <div className="view overlay">
        <div>
          <Image className="card-img-top" fluid={card.image.fluid} alt={card.title} />
            <Link to={link} state={{ sport: card.sport ? card.sport.name : null}}>
            <div className="mask rgba-white-slight"></div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CardImagelink;
