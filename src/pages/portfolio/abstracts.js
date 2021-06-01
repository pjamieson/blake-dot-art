import React from "react"
import { graphql } from "gatsby"

import Layout from "../../components/layout"
import Seo from "../../components/seo"
import CardImageCaptionLink from "../../components/card-image-caption-link"

const AbstractsPortfolioPage = ({ data }) => {
  const {
    allStrapiPainting: { nodes: paintings },
  } = data

  const seo_description = "Illustrates abstract paintings by Blake Jamieson selected from the artist's portfolio, with links to detailed information about each painting."

  return (
    <Layout>
      <Seo title="Abstracts Portfolio" description={seo_description} />
      <div className="container page-container">
        <h1>Portfolio - Abstracts</h1>
        <h4 className="nfs">(Sold or Not for Sale)</h4>
        <section className="gallery">
          <div className="uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid="masonry: true">
            {paintings.map(painting => {
              return <div key={painting.identifier}>
                {painting.image && <CardImageCaptionLink item={painting} caption_format="Portfolio" /> }
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
        subgenre: {name: {eq: "Abstracts"}},
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
          localFile {
            childImageSharp {
              gatsbyImageData(
                width: 600
                placeholder: BLURRED
                formats: [AUTO, WEBP]
              )
            }
          }
        }
        slug
        price
      }
    }
  }
`

export default AbstractsPortfolioPage
