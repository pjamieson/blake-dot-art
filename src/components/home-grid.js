import React from "react";
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby";

import { MDBCard } from "mdbreact";

const getImages = graphql`
  query homeImagesQuery {
    allFile(
        filter: {
          relativeDirectory: { eq: "home" }
        }
      ) {
        edges {
          node {
            base
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
    }
  }
`

const HomeGrid = () => {
  const images = useStaticQuery(getImages);
  return (
    <div className="card-columns">
    {images.allFile.edges.map(({ node }) =>
    (
      <MDBCard>
        <Img fluid={node.childImageSharp.fluid} alt={node.base.split(".")[0]} />
      </MDBCard>
    ))}
    </div>
  );
}

export default HomeGrid;
