import React from "react";
import Img from "gatsby-image"
import {
  MDBBtn,
  MDBCard,
  MDBCardImage,
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBCol,
  MDBContainer,
  MDBRow } from "mdbreact";

const GalleryCarouselComponent = ({images}) => {
  const imgPairs = Math.ceil(images.length/2)

  return (
    <MDBContainer>
      <MDBCarousel activeItem={1} length={Math.ceil(images.length/2)} slide={true} showControls={imgPairs > 1} showIndicators={imgPairs > 1} multiItem>
        <MDBCarouselInner>
          <MDBRow>

          { (images.length ) && <>
            <MDBCarouselItem itemId="1">
              <MDBCol md="6">
                <MDBCard className="mb-2">
                  <Img className="card card-img-top" fluid={images[0].localFile.childImageSharp.fluid} />
                </MDBCard>
              </MDBCol>
              <MDBCol md="6">
                <MDBCard className="mb-2">
                  <Img className="card card-img-top" fluid={images[1].localFile.childImageSharp.fluid} />
                </MDBCard>
              </MDBCol>
            </MDBCarouselItem>
            </>
          }
          
          </MDBRow>
        </MDBCarouselInner>
      </MDBCarousel>
    </MDBContainer>
  );
}

export default GalleryCarouselComponent;
