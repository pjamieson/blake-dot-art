import React, { useState } from 'react';
import { navigate } from "gatsby"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { MDBWaves } from "mdbreact";

import { formatPrice } from "../utils/format"

const CardImageLinkTitle = ({ card }) => {
  //console.log("card", card)
  const [cursorPos, setCursorPos] = useState({})
  const link = `/${(card.qty > 0 ? 'gallery' : 'portfolio')}/${card.subgenre.slug}/${card.slug}`
  const subtitle = (card.subtitle && card.subtitle.length > 0 ? card.subtitle : 'A Blake Jamieson Original')

  const handleTouch = (event) => {
    event.stopPropagation();
    // For Waves effect - Get & Set Cursor Position
    const cursorPos = {
      top: event.clientY,
      left: event.clientX,
      time: Date.now() // time indicates particular clicks
    };
    setCursorPos(cursorPos);
  }

  return (
    <div className="card" key={card.identifier}>
      <div className="view overlay">
        <div role="button" tabIndex={0} onTouchStart={(event) => handleTouch(event)} onClick={() => navigate(link)} onKeyDown={() => navigate(link)}>
          <Img className="card-img-top" fluid={card.image.childImageSharp.fluid} alt={card.title} />
          <MDBWaves cursorPos={cursorPos} />
          <div className="mask rgba-white-slight"></div>
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
