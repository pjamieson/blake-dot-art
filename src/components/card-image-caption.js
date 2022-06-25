import React from 'react';
import { getImageUrl } from "../utils/image-url"

const CardImageCaption = ({ card }) => {

  const image_url = getImageUrl(card.image, "medium")

  return (
    <div className="card client-card">

      <img className="img-fluid" src={image_url} alt={card.title} />

      <div className="card-body">
        <h4 className="card-title">{card.title}</h4>
      </div>

    </div>
  )
}

export default CardImageCaption;
