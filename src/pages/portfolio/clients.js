import React from "react"
import { graphql } from "gatsby"

import Layout from "../../components/layout"
import SEO from "../../components/seo"
import CardImageTitle from "../../components/card-image-title"

const ClientsPage = ({ data }) => {
  const {
    allStrapiClient: { nodes: clients },
  } = data

  return (
    <Layout>
      <SEO title="Clients & Collectors" />
      <div className="container page-container">
        <h1>Clients & Collectors</h1>
        <section className="gallery">
          <div className="uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid="masonry: true">
            {clients.map(card => {
              return <div key={card.id}>
                {card.image && <CardImageTitle card={card} /> }
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
    allStrapiClient(
      limit: 200,
      sort: { order: ASC, fields: order }
    ) {
      nodes {
        id
        image {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
        title: caption
      }
    }
  }
`

export default ClientsPage
