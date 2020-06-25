import React from "react"
import Image from "gatsby-image"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"

const Painting = ({
  data: {
    painting: {
      identifier,
      title,
      image: { fluid },
      subgenre,
      date = {},
      size = {},
      medium = {},
      desc = {},
      price,
    },
  },
}) => {
  return (
    <Layout>
      <div className="container page-container">
        <h1>{title}</h1>
        <div className="painting-detail">
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <article className="card" key={identifier}>
                <div className="view overlay">
                  <Image className="card card-img-top" fluid={fluid} alt={title} />
                </div>
              </article>
              <Link to={`/gallery/${subgenre.slug}`} className="btn-floating btn-action mdb-color lighten-3">
                <i className="fas fa-chevron-left"></i>
              </Link>
            </div>
            <div className="col-sm-12 col-md-6">
              { (date && size) && <p>{date} - {size}</p> }
              { (!(date && size) && date) && <p>{date}</p> }
              { (!(date && size) && size) && <p>{size}</p> }
              { medium && <p>{medium}</p> }
              { desc && <p>{desc.description}</p> }
              { (price > 100) && <h3>${price}</h3> }
              { (price > 100) && <button>Buy Now</button> }
              { (price <= 100) && <button>Inquire for Price</button> }
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query GetSinglePainting($slug: String) {
    painting: contentfulPainting(slug: {eq: $slug}) {
      identifier
      title
      image {
        fluid {
          ...GatsbyContentfulFluid
        }
      }
      subgenre {
        slug
      }
      date
      size
      medium
      desc: description {
        description
      }
      price
    }
  }
`

export default Painting
