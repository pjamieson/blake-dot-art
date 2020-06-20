import React from 'react';
import { Link } from "gatsby"
import Image from "gatsby-image"

const CardTitleLink = ({ card }) => {
  return (
    <div className="card" key={card.identifier}>

      <div className="view overlay">
        <div>
          <Image className="card-img-top" fluid={card.image.fluid} alt={card.title} />
          <Link to={`/${card.subcategory.category.slug}/${card.subcategory.slug}/${card.slug}`}>
            <div className="mask rgba-white-slight"></div>
          </Link>
        </div>
      </div>

      <div>
        <Link to={`/${card.subcategory.category.slug}/${card.subcategory.slug}/${card.slug}`} className="btn-floating btn-action mdb-color lighten-3">
          <i className="fas fa-chevron-right pl-1"></i>
        </Link>
      </div>
      
      <div className="card-body">
        <h4 className="card-title">{card.title}</h4>
      </div>

    </div>
  )
}

export default CardTitleLink;
