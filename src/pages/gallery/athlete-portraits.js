import React from "react"
import { graphql } from "gatsby"

import Layout from "../../components/layout"
import CardTitleLink from "../../components/card-title-link"

const AthletePortraitsGalleryPage = ({ data }) => {
  const {
    allContentfulPainting: { nodes: paintings },
  } = data

  return (
    <Layout>
      <div className="container page-container">
        <h1>Gallery - {paintings[0].subgenre.name}</h1>
        <section className="gallery">
          <div className="card-columns">
            {paintings.map(card => {
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
    allContentfulPainting(
      filter: {
        subgenre: {name: {eq: "Athlete Portraits"}},
        available: {eq: true}}
    ) {
      nodes {
        identifier
        subgenre {
          name
          slug
        }
        title
        image {
          fluid {
            ...GatsbyContentfulFluid
          }
        }
        slug
        available
      }
    }
  }
`

export default AthletePortraitsGalleryPage
