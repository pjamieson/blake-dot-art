import React from "react"
import Image from "gatsby-image"
import { MDBContainer } from "mdbreact"
import { graphql } from "gatsby"

import Layout from "../components/layout"

const Painting = ({
  data: {
    painting: {
      title,
      price,
      medium,
      size,
      image: { fluid },
      description: { description },
    },
  },
}) => {
  return (
    <Layout>
      <MDBContainer className="page-container">
        <h1>{title}</h1>
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <Image fluid={fluid} alt={title} />
            </div>
            <div className="col-sm-12 col-md-6">
              <h2>{title}</h2>
              <p>{medium}</p>
              <p>{size}</p>
              <p>{description}</p>
              <h3>${price}</h3>
              <button>Buy Now</button>
            </div>
          </div>
        </div>
      </MDBContainer>
    </Layout>
  )
}

export const query = graphql`
  query GetSinglePainting($slug: String) {
    painting: contentfulPainting(slug: {eq: $slug}) {
      title
      description {
        description
      }
      price
      medium
      size
      image {
        fluid {
          ...GatsbyContentfulFluid
        }
      }
    }
  }
`

export default Painting
