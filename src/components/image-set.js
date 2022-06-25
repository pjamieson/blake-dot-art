import React from "react"
import { MDBLightbox, MDBLightboxItem } from "mdb-react-ui-kit"
import { getImageUrl } from "../utils/image-url"

const ImageSet = ({ title, subtitle, image, images }) => {
  //console.log("ImageSet images", images)

  // Check for first of multiple images being vertical
  let two_up = false
  if (image && images[0] && images.length > 0 && image.width && image.height && (image.height > image.width )) {
    two_up = true
  }
  if (!image && images[0] && images.length > 1 && images[0].width && images[0].height && images[0].height > images[0].width ) {
    two_up = true
  }

  const alt_text = `${title} - ${subtitle}`

  return (
    <section>
      { !two_up && image &&
        <img src={getImageUrl(image, "large")} className="img-fluid card" alt={alt_text} />
      }
      { !two_up && !image && images &&
        <img src={getImageUrl(images[0], "large")} className="img-fluid card" alt={alt_text} />
      }
      { two_up && image && images &&
        <div className="gallery-image-container">
          <img src={getImageUrl(image, "medium")} className="img-fluid card" alt={alt_text} />
          <img src={getImageUrl(images[0], "medium")} className="img-fluid card" alt={alt_text} />
        </div>
      }
      { two_up && !image && images &&
        <div className="gallery-image-container">
          <img src={getImageUrl(images[0], "medium")} className="img-fluid card" alt={alt_text} />
          <img src={getImageUrl(images[1], "medium")} className="img-fluid card" alt={alt_text} />
        </div>
      }

      { image && images.length > 1 && typeof document !== "undefined" &&
        <div className="lightbox-container">
          <p>Click on any image below to enlarge it</p>
          <MDBLightbox className="uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m uk-text-center" uk-grid="masonry: true">
            <MDBLightboxItem
              src={getImageUrl(image, "medium")}
              fullscreenSrc={getImageUrl(image, "large")}
              className="card" />
            { images.map(img => {
              return <MDBLightboxItem
                src={getImageUrl(img, "medium")}
                fullscreenSrc={getImageUrl(img, "large")}
                className="card" />
              })
            }
          </MDBLightbox>
        </div>
      }
      { !image && images.length > 2 && typeof document !== "undefined" &&
        <div className="lightbox-container">
          <p>Click on any image below to enlarge it</p>
          <MDBLightbox className="uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m uk-text-center" uk-grid="masonry: true">
          { images.map(img => {
            return <MDBLightboxItem
              src={getImageUrl(img, "medium")}
              fullscreenSrc={getImageUrl(img, "large")}
              className="card" />
            })
          }
          </MDBLightbox>
        </div>
      }

    </section>
  )
}

export default ImageSet;
