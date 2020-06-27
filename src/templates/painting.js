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
        <article className="painting-details">
          <h1>{title}</h1>
          <div className="row">
            <div className="col col-sm-12 col-md-6">
              <div className="card" key={identifier}>
                <div className="view overlay">
                  <Image className="card card-img-top" fluid={fluid} alt={title} />
                </div>
              </div>
            </div>

            <div className="col col-sm-12 col-md-6">
              { (date && size) && <p>{date} - {size}</p> }
              { (!(date && size) && date) && <p>{date}</p> }
              { (!(date && size) && size) && <p>{size}</p> }

              { medium && <p>{medium}</p> }

              { desc && <p>{desc.description}</p> }

              { (price > 100) && <div className="buy-now">
                <h3 className="price">${price}</h3><button type="button" className="btn btn-buy-now btn-success btn-rounded">Buy Now <i className="fas fa-chevron-right"></i></button></div> }

              { (price <= 100) && <div className="inquire">
                <button type="button" className="btn btn-inquire btn-info btn-rounded">Inquire</button></div> }

              <div className="back-btn">
                <Link to={`/gallery/${subgenre.slug}`} className="btn-floating btn-action btn-danger">
                  <i className="fas fa-chevron-left"></i>
                </Link>
              </div>
            </div>
          </div>
        </article>
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
