import React, { useState } from 'react';
import { navigate } from "gatsby"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { MDBWaves } from "mdbreact";

const CardProduct = ({ product, category }) => {
  //console.log("CardProduct product", product)
  //console.log("CardProduct category", category)
  const [cursorPos, setCursorPos] = useState({})
  const link = `/product/${product.product_category.slug}/${product.identifier}`
  //console.log("CardProduct link", link)
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
    <div className="card" key={product.identifier}>

      <div className="view overlay">
        {  (product.qty > 0) &&
          <div role="button" tabIndex={0} onTouchStart={(event) => handleTouch(event)} onClick={() => navigate(link)} onKeyDown={() => navigate(link)}>
            <Img className="card-img-top" fluid={product.images[0].localFile.childImageSharp.fluid} alt={product.title} />
            <MDBWaves cursorPos={cursorPos} />
            <div className="mask rgba-white-slight"></div>
          </div>
        }
        { (product.qty < 1) &&
          <div>
            <Img className="card-img-top" fluid={product.images.localFile.childImageSharp.fluid} alt={product.title} />
          </div>
        }
        { (product.qty === 0) &&
          <button type="button" className="btn btn-sold btn-primary btn-rounded">Sold Out</button>
        }
      </div>

      { (product.qty > 0) &&
        <div>
          <Link to={link} className="btn-floating btn-action btn-primary">
            <i className="fas fa-chevron-right pl-1"></i>
          </Link>
        </div>
      }

      <div className="card-body">
        <h4>{product.title}</h4>
      { (product.subtitle) && <h5 className="card-title dark-grey-text">{product.subtitle}</h5> }
      </div>

    </div>
  )
}

export default CardProduct;
