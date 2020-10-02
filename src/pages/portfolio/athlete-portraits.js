import React from "react"
import { graphql } from "gatsby"

import Layout from "../../components/layout"
import SEO from "../../components/seo"
import CardImageLinkTitle from "../../components/card-image-link-title"

const AthletePortraitsPortfolioPage = ({ location, data }) => {
  const {
    allStrapiSport: { nodes: sports },
    allStrapiPainting: { nodes: paintings },
  } = data

  // If passed a sport, open to that sport. Otherwise open first sport on list.
  const [value, setValue] = React.useState(location.state && location.state.sport ?
    sports.findIndex(s => s.name === location.state.sport) : 0)

  return (
    <Layout>
      <SEO title="Athlete Portraits Portfolio" />
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
                   <div key={card.identifier}>
                    {card.image && <CardImageLinkTitle card={card} /> }
                  </div>
                  : null
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
    allStrapiSport(
      limit: 20,
      sort: { order: ASC, fields: order }
    ) {
      nodes {
        name
      }
    },
    allStrapiPainting(
      filter: {
        subgenre: {name: {eq: "Athlete Portraits"}},
        portfolio: {eq: true},
        qty: {lt: 1}
      },
      sort: {
        fields: order, order: ASC
      }
    ) {
      nodes {
        identifier
        subgenre {
          name
          slug
        }
        title
        image {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
        sport {
          name
        }
        slug
      }
    }
  }
`

export default AthletePortraitsPortfolioPage
