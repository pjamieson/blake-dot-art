import React, { useState } from 'react';
import { navigate } from "gatsby"
import Img from "gatsby-image"
import { MDBWaves } from "mdbreact";

const CardImagelink = ({ location, card }) => {
  const [cursorPos, setCursorPos] = useState({})
  //console.log("card", card)
  const menu = (card.player ? 'merch' : (card.qty > 0 ? 'gallery' : 'portfolio'))
  const link = `/${menu}/${card.player ? 'topps2020' : card.subgenre.slug}/`

  const handleClick = (event) => {
    event.stopPropagation();
    // For Waves effect - Get & Set Cursor Position
    const cursorPos = {
      top: event.clientY,
      left: event.clientX,
      time: Date.now() // time indicates particular clicks
    };
    setCursorPos(cursorPos);

    if (!card.sport && !card.player) {
      navigate(link)
    }
    if (card.sport) {
      navigate(link, { state: { sport: card.sport.name } })
    }
    if (card.player) {
      navigate('/topps2020', { state: { player: card.player.name } })
    }
  }

  return (
    <div className="card" key={card.identifier}>
      <div className="view overlay">
        <div role="button" onMouseUp={(event) => handleClick(event)} onTouchStart={(event) => handleClick(event)}>
          <Img className="card-img-top" fluid={card.image.childImageSharp.fluid} alt={card.title} />
          <MDBWaves cursorPos={cursorPos} />
          <div className="mask rgba-white-slight"></div>
        </div>
      </div>
    </div>
  )
}

export default CardImagelink;
