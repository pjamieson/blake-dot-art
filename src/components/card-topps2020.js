import React from 'react';
import { Link } from "gatsby"
import Image from "gatsby-image"

const CardTopps2020 = ({ card }) => {
  const link = `/merch/topps2020/${card.identifier}`
  return (
    <div className="card" key={card.identifier}>

      <div className="view overlay">
        <div>
          <Image className="card-img-top" fluid={card.image.fluid} alt={card.title} />
          { (card.qtyAvail > 0) &&
            <Link to={link}>
              <div className="mask rgba-white-slight"></div>
            </Link>
          }
        </div>
        { (card.qtyAvail === 0 && card.qtyAvail !== -1) &&
          <button type="button" className="btn btn-sold btn-danger btn-rounded">Sold Out</button>
        }
      </div>

      { (card.qtyAvail > 0) &&
        <div>
          <Link to={link} className="btn-floating btn-action btn-success">
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
