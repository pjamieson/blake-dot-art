import React from 'react';
import { Link } from "gatsby"
import Img from "gatsby-image"

const CardImagelink = ({ location, card }) => {
  const menu = (card.player ? 'merch' : (card.available ? 'gallery' : 'portfolio'))
  const link = `/${menu}/${card.player ? 'topps2020' : card.subgenre.slug}/`
  return (
    <div className="card" key={card.identifier}>
      <div className="view overlay">
        <div>
          <Img className="card-img-top" fluid={card.image.childImageSharp.fluid} alt={card.title} />
          {(!card.sport && !card.player) && <Link to={link}>
            <div className="mask rgba-white-slight"></div></Link>}
          {(card.sport) && <Link to={link} state={{ sport: card.sport.name }}>
            <div className="mask rgba-white-slight"></div></Link>}
          {(card.player) && <Link to={link} state={{ player: card.player.name }}>
            <div className="mask rgba-white-slight"></div></Link>}
        </div>
      </div>
    </div>
  )
}

export default CardImagelink;
