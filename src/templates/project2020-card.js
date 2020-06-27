import React from "react"
import Image from "gatsby-image"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"

// Begin needed for Rich Text
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

const Bold = ({ children }) => <span className="bold">{children}</span>
const Text = ({ children }) => <p className="align-center">{children}</p>

const options = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
  },
}
// End needed for Rich Text

const Project2020Card = ({
  data: {
    p2020card: {
      identifier,
      player,
      title,
      subtitle = {},
      limitation = {},
      image: { fluid },
      desc = {},
      det = {},
      qtyAvail,
      price,
    },
  },
}) => {
  return (
    <Layout>
      <div className="container page-container">
        <article className="p2020-card-details">
          <h1>{title} : Artist-Autographed Card</h1>
          <div className="row">
            <div className="col col-sm-12 col-md-6">
              <div className="card" key={identifier}>
                <div className="view overlay">
                  <Image className="card card-img-top" fluid={fluid} alt={title} />
                </div>
              </div>
              <aside className="card-details">
                {documentToReactComponents(det.json, options)}
              </aside>
            </div>

            <div className="col col-sm-12 col-md-6">
              <h2>{subtitle}</h2>
              <div className="card-description">
                {documentToReactComponents(desc.json, options)}
              </div>

              { (price > 10) && <div className="buy-now">
                <h3 className="price">${price}</h3><button type="button" className="btn btn-buy-now btn-success btn-rounded">Buy Now <i className="fas fa-chevron-right"></i></button></div> }

              { (price <= 10) && <div className="inquire">
                <button type="button" className="btn btn-inquire btn-info btn-rounded">Inquire</button></div> }

              <div className="back-btn">
                <Link to={`/merch/topps2020/`} state={{ player: player.name }} className="btn-floating btn-action btn-danger">
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
  query GetSingle2020Card($slug: String) {
    p2020card: contentfulToppsP2020Card(identifier: {eq: $slug}) {
      identifier
      player {
        name
      }
      title
      subtitle
      limitation
      image {
        fluid {
          ...GatsbyContentfulFluid
        }
      }
      desc: description {
        json
      }
      det: details {
        json
      }
      qtyAvail
      price
    }
  }
`

export default Project2020Card
