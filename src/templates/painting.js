import React from "react"
import Image from "gatsby-image"
import { MDBContainer } from "mdbreact"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"

const Painting = ({
  data: {
    painting: {
      identifier,
      subcategory,
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
        <div className="painting-detail">
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <article className="card" key={identifier}>
                <div className="view overlay">
                  <Image className="card-img-top" fluid={fluid} alt={title} />
                </div>
                <Link to={`/${subcategory.category.slug}/${subcategory.slug}`} className="btn-floating btn-action mdb-color lighten-3">
                  <i className="fas fa-chevron-left"></i>
                </Link>
              </article>
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
      subcategory {
        category {
          slug
        }
        slug
      }
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
