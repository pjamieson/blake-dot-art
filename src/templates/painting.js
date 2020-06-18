import React from "react"
import Image from "gatsby-image"
import { MDBCard, MDBContainer } from "mdbreact"
import { graphql } from "gatsby"

import Layout from "../components/layout"

const Painting = ({
  data: {
    painting: {
      image: { fluid },
      title,
      date = {},
      price = {},
      medium = {},
      size = {},
      desc = {},
    },
  },
}) => {
  return (
    <Layout>
      <MDBContainer className="page-container">
        <h1>{title}</h1>
        <div className="gallery-container">
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <MDBCard>
                <Image fluid={fluid} alt={title} />
              </MDBCard>
            </div>
            <div className="col-sm-12 col-md-6">
              { (date && medium) && <p>{date} - {medium}</p> }
              { (!(date && medium) && date) && <p>{date}</p> }
              { (!(date && medium) && medium) && <p>{medium}</p> }
              <p>{size}</p>
              { desc && <p>{desc.description}</p> }
              { (price > 100) && <h3>${price}</h3> }
              { (price > 100) && <button>Buy Now</button> }
              { (price <= 100) && <button>Inquire for Price</button> }
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
      desc: description {
        description
      }
      price
    }
  }
`

export default Painting
