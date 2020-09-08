import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import CardTopps2020 from "../components/card-topps2020"

const ToppsProject2020PlayerPage = ({data}) => {
  const {
    allStrapiTradingcard: { nodes: p2020cards }
  } = data

  const pageTitle = `${p2020cards[0].project_2020_player.name} - Topps Project 2020 Cards`

  return (
    <Layout>
      <SEO title={pageTitle} />
      <div className="container page-container">
        <h1 className="page-head">{p2020cards[0].title}</h1>
        <h2 className="player-subhead">Topps Project 2020 Cards by Blake Jamieson</h2>
        <section className="topps">
          <article className="content-container">
            <div className="uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid="masonry: true">
              {p2020cards.map((card) => {
                return (
                  <div className="p2020" key={card.identifier}>
                    <CardTopps2020 card={card} />
                  </div>
                )
              })}
            </div>
          </article>
        </section>
      </div>
    </Layout>
  )
}

export const query = graphql`
query GetPlayerTradingcards($name: String) {
  allStrapiTradingcard(
    filter: {project_2020_player: {name: {eq: $name}}},
    sort: {order: ASC, fields: order}
  ) {
    nodes {
      strapiId
      identifier
      project_2020_player {
        name
      }
      image {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      title
      subtitle
      limitation
      qty
    }
  }
}
`

export default ToppsProject2020PlayerPage
