import React from "react"
import { graphql } from "gatsby"

import Layout from "../../components/layout"
import CardTitle from "../../components/card-title"

const ProOtherSportsPage = ({ data }) => {
  const {
    allContentfulPainting: { nodes: paintings },
  } = data

  return (
    <Layout>
      <div className="container page-container">
        <h1>{paintings[0].subcategory.category.name} - {paintings[0].subcategory.name}</h1>
        <h4 className="nfs">(Sold or Not for Sale)</h4>
        <section className="gallery">
          <div className="card-columns">
            {paintings.map(card => {
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
    allContentfulPainting(
      filter: {
        subcategory: {name: {eq: "Other Sports"}}
      }
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

export default ProOtherSportsPage
