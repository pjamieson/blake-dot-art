import React from "react"
import { graphql } from "gatsby"

import Layout from "../../components/layout"
import Seo from "../../components/seo"
import CardImageCaptionLink from "../../components/card-image-caption-link"

const FelixPortfolioPage = ({ data }) => {
  const {
    allStrapiPainting: { nodes: paintings },
  } = data

  const seo_description = "Illustrates paintings from the 'Felix the Cat' series by Blake Jamieson selected from the artist's portfolio, with links to detailed information about each painting."

  return (
    <Layout>
      <Seo title="Felix the Cat Series Portfolio" description={seo_description} />
      <div className="container page-container">
        <h1>Portfolio - Felix the Cat Series</h1>
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
        subgenre: {name: {eq: "Felix the Cat Series"}},
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
        price
      }
    }
  }
`

export default FelixPortfolioPage
