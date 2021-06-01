import React from "react"
import { graphql } from "gatsby"

import Layout from "../../components/layout"
import Seo from "../../components/seo"
import CardImageCaption from "../../components/card-image-caption"

const ClientsPage = ({ data }) => {
  const {
    allStrapiClient: { nodes: clients },
  } = data

  const seo_description = "Photographs of selected celebrity clients and collectors of portraits by the artist Blake Jamieson, with the subjects holding their portraits."

  return (
    <Layout>
      <Seo title="Clients & Collectors" description={seo_description} />
      <div className="container page-container">
        <h1>Clients & Collectors</h1>
        <section className="gallery">
          <div className="uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid="masonry: true">
            {clients.map(card => {
              return <div key={card.id}>
                {card.image && <CardImageCaption card={card} /> }
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
          localFile {
            childImageSharp {
              gatsbyImageData(
                width: 400
                placeholder: BLURRED
                formats: [AUTO, WEBP]
              )
            }
          }
        }
        title: caption
      }
    }
  }
`

export default ClientsPage
