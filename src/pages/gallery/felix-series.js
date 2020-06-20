import React from "react"
import { graphql } from "gatsby"

import Layout from "../../components/layout"
import CardTitleLink from "../../components/card-title-link"

const FelixGalleryPage = ({ data }) => {
  const {
    allContentfulPainting: { nodes: paintings },
  } = data

  return (
    <Layout>
      <div className="container page-container">
        <h1>{paintings[0].subcategory.category.name} - {paintings[0].subcategory.name}</h1>
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
        subcategory: {name: {eq: "Felix the Cat Series"}},
        sold: {eq: false}}
    ) {
      nodes {
        identifier
        subcategory {
          name
          slug
          category {
            name
            slug
          }
        }
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

export default FelixGalleryPage
