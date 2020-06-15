import React from "react";
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby";

import { MDBCard } from "mdbreact";

const OtherPortraitsGalleryGrid = () => {
  const data = useStaticQuery(graphql`
    query galleryOtherPortraitsImageQuery {
      allFile(
        filter: {
          relativeDirectory: { eq: "gallery/other-portraits" }
        }
      ) {
        edges {
          node {
            base
            childImageSharp {
              fluid {
                aspectRatio
                base64
                sizes
                src
                srcSet
              }
            }
          }
        }
      }
    }
  `)
  return (
    <div className="card-columns">
      {data.allFile.edges.map(({ node }) =>
      (
        <MDBCard>
          <Img fluid={node.childImageSharp.fluid} alt={node.base.split(".")[0]} />
        </MDBCard>
      ))}
    </div>
  );
}

export default OtherPortraitsGalleryGrid;
