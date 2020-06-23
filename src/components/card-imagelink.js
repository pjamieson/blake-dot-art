import React from 'react';
import { Link } from "gatsby"
import Image from "gatsby-image"

const CardImagelink = ({ card }) => {
  const category = `${card.available} ? "gallery" : "portfolio"`
  return (
    <div className="card" key={card.identifier}>

      <div className="view overlay">
        <div>
          <Image className="card-img-top" fluid={card.image.fluid} alt={card.title} />
          <Link to={`/${category}/${card.subgenre.slug}`}>
            <div className="mask rgba-white-slight"></div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CardImagelink;
