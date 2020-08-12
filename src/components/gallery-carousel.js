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
      <MDBCarousel activeItem={1} length={Math.ceil(images.length/2)} slide={true} showControls={false} showIndicators={images.length > 2} multiItem>
        <MDBCarouselInner>
          <MDBRow>
          { (images.length === 3) && <>
            <MDBCarouselItem itemId="1">
              <MDBCol md="6">
                <MDBCard className="mb-2">
                  <Img className="card card-img-top" fluid={images[0].formats.medium.childImageSharp.fluid} alt={images[0].alternativeText} />
                </MDBCard>
              </MDBCol>
              <MDBCol md="6">
                <MDBCard className="mb-2">
                  <Img className="card card-img-top" fluid={images[1].formats.medium.childImageSharp.fluid} alt={images[1].alternativeText} />
                </MDBCard>
              </MDBCol>
            </MDBCarouselItem>
            <MDBCarouselItem itemId="2">
              <MDBCol md="6">
                <MDBCard className="mb-2">
                <Img className="card card-img-top" fluid={images[2].formats.medium.childImageSharp.fluid} alt={images[2].alternativeText} />
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
