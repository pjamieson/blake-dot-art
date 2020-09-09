import React, { useState } from 'react';
import { navigate } from "gatsby"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { MDBWaves } from "mdbreact";

const CardTopps2020 = ({ card }) => {
  const [cursorPos, setCursorPos] = useState({})
  const link = `/topps2020/${card.identifier}`

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
        {  (card.qty > 0) &&
          <div role="button" tabIndex={0} onTouchStart={(event) => handleTouch(event)} onClick={() => navigate(link)} onKeyDown={() => navigate(link)}>
            <Img className="card-img-top" fluid={card.image.childImageSharp.fluid} alt={card.title} />
            <MDBWaves cursorPos={cursorPos} />
            <div className="mask rgba-white-slight"></div>
          </div>
        }
        { (card.qty < 1) &&
          <div>
            <Img className="card-img-top" fluid={card.image.childImageSharp.fluid} alt={card.title} />
          </div>
        }
        { (card.qty === 0) &&
          <button type="button" className="btn btn-sold btn-primary btn-rounded">Sold Out</button>
        }
      </div>

      { (card.qty > 0) &&
        <div>
          <Link to={link} className="btn-floating btn-action btn-primary">
            <i className="fas fa-chevron-right pl-1"></i>
          </Link>
        </div>
      }

      <div className="card-body">
        <h4>{card.title}</h4>
      { (card.subtitle) && <h5 className="card-title dark-grey-text">{card.subtitle}</h5> }
      { (card.limitation) && <p className="card-title">{card.limitation}</p> }
      </div>

    </div>
  )
}

export default CardTopps2020;
