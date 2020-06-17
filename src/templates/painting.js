import React from "react"
import Image from "gatsby-image"
import { MDBContainer } from "mdbreact"
import { graphql } from "gatsby"

import Layout from "../components/layout"

const Painting = ({
  data: {
    painting: {
      title,
      date,
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
              <p>{date} - {medium}</p>
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
      identifier
      image {
        fluid {
          ...GatsbyContentfulFluid
        }
      }
      title
      date
      medium
      size
      description {
        description
      }
      price
      sold
    }
  }
`

export default Painting
