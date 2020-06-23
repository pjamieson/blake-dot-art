import React from "react"
import { graphql } from "gatsby"

import Layout from "../../components/layout"
import CardTitle from "../../components/card-title"

const Topps2020Page = ({ data }) => {
  const {
    allContentfulTradingCard: { nodes: cards },
  } = data

  return (
    <Layout>
      <div className="container page-container">
        <h1>Merch - Topps Project 2020</h1>
        <section className="merch">
          <div className="card-columns">
            {cards.map(card => {
              return <div>
                <CardTitle card={card} />
              </div>
            })}
          </div>
        </section>
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    allContentfulTradingCard {
      nodes {
        identifier
        title
        image {
          fluid {
            ...GatsbyContentfulFluid
          }
        }
        slug
      }
    }
  }
`

export default Topps2020Page
