import React from 'react';
import Img from "gatsby-image"

const ImageSet = ({ location, imageset }) => {
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
