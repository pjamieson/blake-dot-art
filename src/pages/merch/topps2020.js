import React from "react"
import { graphql } from "gatsby"

import Layout from "../../components/layout"
import CardTitleLink from "../../components/card-title-link"

const Topps2020Page = ({ data }) => {
  const {
    allContentfulTradingCard: { nodes: cards },
  } = data

  return (
    <Layout>
      <div className="container page-container">
        <h1>{cards[0].subcategory.category.name} - {cards[0].subcategory.name}</h1>
        <section className="merch">
          <div className="card-columns">
            {cards.map(card => {
              return <div>
                <CardTitleLink card={card} />
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
    allContentfulTradingCard(
      filter: {
        subcategory: {name: {eq: "Topps Project 2020"}}
      }
    ) {
      nodes {
        identifier
        title
        image {
          fluid {
            ...GatsbyContentfulFluid
          }
        }
        slug
        subcategory {
          name
          slug
          category {
            name
            slug
          }
        }
      }
    }
  }
`

export default Topps2020Page
