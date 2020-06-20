import React from 'react';
import Image from "gatsby-image"

const CardTitle = ({ card }) => {
  return (
    <div className="card" key={card.identifier}>

      <div className="view overlay">
        <div>
          <Image className="card-img-top" fluid={card.image.fluid} alt={card.title} />
        </div>
      </div>

      <div className="card-body">
        <h4 className="card-title">{card.title}</h4>
      </div>

    </div>
  )
}

export default CardTitle;
