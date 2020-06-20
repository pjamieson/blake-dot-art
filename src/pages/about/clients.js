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
          <div className="card-columns">
            {clients.map(card => {
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
    allContentfulClient {
      nodes {
        identifier: id
        image {
          fluid {
            ...GatsbyContentfulFluid
          }
        }
        title: caption
        order
      }
    }
  }
`

export default ClientsPage
