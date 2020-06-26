import React from "react"
import { graphql } from "gatsby"

import Layout from "../../components/layout"
import CardTitleLink from "../../components/card-title-link"

const OtherPortraitsGalleryPage = ({ data }) => {
  const {
    allContentfulPainting: { nodes: paintings },
  } = data

  return (
    <Layout>
      <div className="container page-container">
        <h1>Gallery - {paintings[0].subgenre.name}</h1>
        <section className="gallery">
          <div className="uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid="masonry: true">
            {paintings.map(card => {
              return <div key={card.identifier}>
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
        subgenre: {name: {eq: "Other Portraits"}},
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

export default OtherPortraitsGalleryPage
