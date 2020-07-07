import React from "react"
import Image from "gatsby-image"
import { Link, graphql } from "gatsby"
import ReactMarkdown from "react-markdown";

import Layout from "../components/layout"

import { addToCart } from "../utils/cart"

const Project2020Card = ({
  data: {
    p2020card: {
      identifier,
      project_2020_player: player,
      title,
      subtitle = {},
      limitation = {},
      image: { childImageSharp: { fluid }},
      description = {},
      details = {},
      qty: qtyAvail,
      price,
    },
  },
}) => {
  return (
    <Layout>
      <div className="container page-container">
        <article className="p2020-card-details">
          <h1>{title} : Artist-Autographed Card</h1>
          <div className="uk-grid-small uk-child-width-1-2@s" uk-grid="masonry: true">
            <div>
              <div className="card" key={identifier}>
                <div className="view overlay">
                  <Image className="card card-img-top" fluid={fluid} alt={title} />
                </div>
                <div className="back-btn">
                  <Link to={`/merch/topps2020/`} state={{ player: player.name }} className="btn-floating btn-action btn-danger">
                    <i className="fas fa-chevron-left"></i>
                  </Link>
                </div>
              </div>
              <aside className="card-details">
                <ReactMarkdown source={details} />
              </aside>
            </div>
            <div className="buy-or-inquire">
              <div className="card-description">
                <h2>{subtitle}</h2>
                <ReactMarkdown source={description} />
                { (price > 10) && <div className="buy-now">
                    <h3 className="price">${price}</h3>
                    <button type="button" className="btn btn-buy-now btn-success btn-rounded" onClick={() => addToCart('p2020card', identifier)}>
                      <i className="fas fa-cart-plus"></i>Add to Cart
                    </button>
                  </div>
                }
                { (price <= 10) && <div className="inquire">
                    <button type="button" className="btn btn-inquire btn-info btn-rounded">
                      Inquire
                    </button>
                  </div>
                }
              </div>
            </div>
          </div>
        </article>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query GetSingle2020Card($slug: String) {
    p2020card: strapiProject2020Card(identifier: {eq: $slug}) {
      identifier
      project_2020_player {
        name
      }
      title
      subtitle
      limitation
      image {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      description
      details
      qty
      price
    }
  }
`

export default Project2020Card
