import React from 'react';
import { Link } from "gatsby"
import Image from "gatsby-image"

const CardImagelink = ({ card }) => {
  return (
    <div className="card" key={card.identifier}>

      <div className="view overlay">
        <div>
          <Image className="card-img-top" fluid={card.image.fluid} alt={card.title} />
          <Link to={`/${card.subcategory.category.slug}/${card.subcategory.slug}`}>
            <div className="mask rgba-white-slight"></div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CardImagelink;
