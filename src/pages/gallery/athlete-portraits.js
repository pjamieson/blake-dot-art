import React from "react"
import { graphql } from "gatsby"

import Layout from "../../components/layout"
import Seo from "../../components/seo"
import CardImageCaptionLink from "../../components/card-image-caption-link"

const AthletePortraitsGalleryPage = ({ data }) => {
  const {
    allStrapiPainting: { nodes: paintings },
  } = data

  const seo_description = "Illustrates athlete portraits by Blake Jamieson offered for sale, sorted by the athletes' sports."

  return (
    <Layout>
      <Seo title="Athlete Portraits Gallery" description={seo_description} />
      <div className="container page-container">
        <h1>Gallery - Athlete Portraits</h1>
        <section className="gallery">
          <div className="uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid="masonry: true">
          {paintings.map(painting => {
            return <div key={painting.identifier}>
              {painting.image && <CardImageCaptionLink item={painting} caption_format="Gallery" /> }
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
    allStrapiPainting(
      filter: {
        subgenre: {name: {eq: "Athlete Portraits"}},
        qty: {gt: 0}
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
        subtitle
        price
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
        slug
        qty
      }
    }
  }
`

export default AthletePortraitsGalleryPage
