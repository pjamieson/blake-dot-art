import React from "react"
import { graphql } from "gatsby"

import Layout from "../../components/layout"
import CardTitle from "../../components/card-title"

const AthletePortraitsPortfolioPage = ({ location, data }) => {
  const {
    allContentfulSport: { nodes: sports },
    allContentfulPainting: { nodes: paintings },
  } = data

  // If passed a sport, open to that sport. Otherwise open first sport on list.
  const [value, setValue] = React.useState(location.state && location.state.sport ?
    sports.findIndex(s => s.name === location.state.sport) : 0)

  return (
    <Layout>
      <div className="container page-container">
        <h1 className="page-head">Portfolio - Athlete Portraits</h1>
        <h4 className="nfs">(Sold or Not for Sale)</h4>
        <section className="sports">

          <div className="btn-container">
            <hr/>
            {sports.map((sport, index) => {
              return (
                <div key={index}>
                  <button className={`std-btn ${index === value && "active-btn"}`} onClick={() => setValue(index)}>{sport.name}</button>
                </div>
              )
            })}
          </div>

          <article className="content-container gallery">
            <div className="uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid="masonry: true">
              {paintings.map((card) => {
                return (
                  card.sport && card.sport.name === sports[value].name ?
                   <div><CardTitle card={card} /></div> : null
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
    allContentfulSport(
      sort: {
        order: ASC, fields: order
      }
    ) {
      nodes {
        name
      }
    },
    allContentfulPainting(
      filter: {
        subgenre: {name: {eq: "Athlete Portraits"}},
        portfolio: {eq: true},
        available: {eq: false}
      }
    ) {
      nodes {
        title
        image {
          fluid {
            ...GatsbyContentfulFluid
          }
        }
        sport {
          name
        }
      }
    }
  }
`

export default AthletePortraitsPortfolioPage
