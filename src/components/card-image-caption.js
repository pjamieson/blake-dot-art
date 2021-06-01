import React from 'react';
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const CardImageCaption = ({ card }) => {

  const image = getImage(card.image.localFile.childImageSharp.gatsbyImageData)

  return (
    <div className="card">

      <GatsbyImage className="img-fluid rounded" image={image} alt={card.title} />

      <div className="card-body">
        <h4 className="card-title">{card.title}</h4>
      </div>

    </div>
  )
}

export default CardImageCaption;
