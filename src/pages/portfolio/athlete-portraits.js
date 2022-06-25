import React, { useState } from "react"
import { graphql } from "gatsby"

import Layout from "../../components/layout"
import Seo from "../../components/seo"
import CardImageCaptionLink from "../../components/card-image-caption-link"

const AthletePortraitsPortfolioPage = ({ location, data }) => {
  const {
    allStrapiSport: { nodes: sports },
    allStrapiPainting: { nodes: paintings },
  } = data

  // If passed a sport, open to that sport. Otherwise open first sport on list.
  const [ndx, setNdx] = useState(location.state && location.state.sport ?
    sports.findIndex(s => s.name === location.state.sport) : 0)

  const seo_description = "Illustrates athlete portraits by Blake Jamieson selected from the artist's portfolio, with links to detailed information about each painting."

  return (
    <Layout>
      <Seo title="Athlete Portraits Portfolio" description={seo_description} />
      <div className="container page-container">
        <h1 className="page-head">Portfolio - Athlete Portraits</h1>
        <h4 className="nfs">(Sold or Not for Sale)</h4>
        <section className="sports">

          <div className="btn-container">
            <hr/>
            {sports.map((sport, index) => {
              return (
                <div key={index}>
                  <button className={`std-btn ${index === ndx && "active-btn"}`} onClick={() => setNdx(index)}>{sport.name}</button>
                </div>
              )
            })}
          </div>

          <article className="content-container gallery">
            <div className="uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid="masonry: true">
              {paintings.map((painting) => {
                return (
                  (painting.sport && painting.sport.name === sports[ndx].name) ?
                   <div key={painting.identifier}>
                    {painting.image && <CardImageCaptionLink item={painting} caption_format="Portfolio" /> }
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
          formats {
            large {
              url
            }
            medium {
              url
            }
            small {
              url
            }
            thumbnail {
              url
            }
          }
          height
          localFile {
            publicURL
          }
          width
          url
        }
        sport {
          name
        }
        slug
        price
      }
    }
  }
`

export default AthletePortraitsPortfolioPage
