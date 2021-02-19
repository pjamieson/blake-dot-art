import React, { useState } from 'react';
import Img from "gatsby-image"
import { MDBWaves } from "mdbreact";

const ImageSet = ({ location, imageset }) => {
  const [cursorPos, setCursorPos] = useState({})
  //console.log("ImageSet imageset", imageset)

  const handleClick = (event) => {
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
    <div>
      <section className="gallery">
        <div className="imageset uk-grid-small uk-child-width-1-2@s uk-child-width-1-2@m" uk-grid="masonry: true">
          { imageset.map(image => {
            return <div key={image.key}>
              <Img className="card" fluid={image.fluid} alt={image.title} />
            </div>
            })
          }
        </div>
      </section>
    </div>
  )
}

export default ImageSet;
