import React from 'react';
import Img from "gatsby-image"

const CardImageTitle = ({ card }) => {
  return (
    <div className="card">

      <div className="view overlay">
        <div>
          <Img className="card-img-top" fluid={card.image.childImageSharp.fluid} alt={card.title} />
        </div>
      </div>

      <div className="card-body">
        <h4 className="card-title">{card.title}</h4>
      </div>

    </div>
  )
}

export default CardImageTitle;
