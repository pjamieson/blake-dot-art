import React from "react"
import { graphql } from "gatsby"

import Layout from "../../components/layout"
import CardTitle from "../../components/card-title"

const ClientsPage = ({ data }) => {
  const {
    allContentfulClient: { nodes: clients },
  } = data

  return (
    <Layout>
      <div className="container page-container">
        <h1>Clients & Collectors</h1>
        <section className="gallery">
          <div className="uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid="masonry: true">
            {clients.map(card => {
              return <div key={card.id}>
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
    allContentfulClient(
      sort: {
        order: ASC, fields: order
      }
    ) {
      nodes {
        identifier: id
        image {
          fluid {
            ...GatsbyContentfulFluid
          }
        }
        title: caption
      }
    }
  }
`

export default ClientsPage
