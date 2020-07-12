import React from "react"
import { graphql } from "gatsby"

import Layout from "../../components/layout"
import CardTopps2020 from "../../components/card-topps2020"

const ToppsProject2020Page = ({ location, data }) => {
  const {
    allStrapiProject2020Player: { nodes: players },
    allStrapiTradingcard: { nodes: p2020cards }
  } = data

  // If passed a player, open to that player. Otherwise open first player on list.
  const [value, setValue] = React.useState(location.state && location.state.player ?
    players.findIndex(s => s.name === location.state.player) : 0)

  return (
    <Layout>
      <div className="container page-container">
        <h1 className="page-head">Topps Project 2020 Cards by Blake Jamieson</h1>
        <section className="topps">

          <div className="btn-container">
            <hr/>
            {players.map((player, index) => {
              return (
                <div key={index}>
                  <button className={`std-btn ${index === value && "active-btn"}`} onClick={() => setValue(index)}>{player.name}</button>
                </div>
              )
            })}
          </div>

          <article className="content-container">
            <div className="uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid="masonry: true">
              {p2020cards.map((card) => {
                return (
                  card.project_2020_player && card.project_2020_player.name === players[value].name ?
                   <div className="p2020" key={card.identifier}>
                    <CardTopps2020 card={card} /></div> : null
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
  {
    allStrapiProject2020Player(
      sort: {
        order: DESC, fields: order
      }
    ) {
      nodes {
        name
      }
    },
    allStrapiTradingcard(
      sort: {
        order: ASC, fields: order
      }
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

export default ToppsProject2020Page
