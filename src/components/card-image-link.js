import React, { useState } from 'react';
import { navigate } from "gatsby"
import Img from "gatsby-image"
import { MDBWaves } from "mdbreact";

const CardImagelink = ({ location, card }) => {
  const [cursorPos, setCursorPos] = useState({})
  //console.log("card", card)

  const isTradingcard = (card.project_2020_player || card.topps_1951_player || card.project_70_player)

  const isProduct = card.product_category

  const menu = (isTradingcard ? 'topps' : (isProduct ? 'product' : (card.qty > 0 ? 'gallery' : 'portfolio')))

  let toppsSeries = ""
  let player = ""
  if (card.project_2020_player) {
    toppsSeries = "project2020"
    player = card.project_2020_player.name
  }
  if (card.topps_1951_player) {
    toppsSeries = "1951"
    player = card.topps_1951_player.name
  }
  if (card.project_70_player) {
    toppsSeries = "project70"
    player = card.project_70_player.name
  }

  const submenu = (isProduct ? card.product_category : (toppsSeries.length > 0 ? toppsSeries : card.subgenre.slug))

  const link = `/${menu}/${submenu}/`

  const handleClick = (event) => {
    event.stopPropagation();
    // For Waves effect - Get & Set Cursor Position
    const cursorPos = {
      top: event.clientY,
      left: event.clientX,
      time: Date.now() // time indicates particular clicks
    };
    setCursorPos(cursorPos);

    if (isProduct) {
      navigate(link)
    }
    if (!isTradingcard && !card.sport) {
      // Non-sport painting
      navigate(link)
    }
    if (card.sport) {
      // Sport/Athlete painting
      navigate(link, { state: { sport: card.sport.name } })
    }
    if (isTradingcard) {
      navigate(link, { state: { player: player } })
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
