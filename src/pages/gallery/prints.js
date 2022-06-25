import React from "react"
import { graphql } from "gatsby"

import { MDBCard, MDBCardBody } from "mdb-react-ui-kit"

import Layout from "../../components/layout"
import Seo from "../../components/seo"
import CardImageCaptionLink from "../../components/card-image-caption-link"

const PrintsGalleryPage = ({ data }) => {
  const {
    allStrapiPainting: { nodes: paintings },
  } = data

  const seo_description = "Images of limited edition prints offered for sale on BLAKE.ART, with links to details about each print."

  return (
    <Layout>
      <Seo title="Prints Gallery" description={seo_description} />
      <div className="container page-container">
        <h1>Gallery - Prints</h1>

        { paintings.length === 0 &&
          <MDBCard>
            <MDBCardBody>
              <div>
                <h2 className='mt-1 text-center'>More prints coming soon...</h2>
              </div>
            </MDBCardBody>
          </MDBCard>
        }
        { paintings.length > 0 &&
          <section className="gallery">
            <div className="uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid="masonry: true">
            {paintings.map(painting => {
              return <div key={painting.identifier}>
                {painting.image && <CardImageCaptionLink item={painting} caption_format="Gallery" /> }
                </div>
              })}
            </div>
          </section>
        }

      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    allStrapiPainting(
      filter: {
        subgenre: {name: {eq: "Prints"}},
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

export default PrintsGalleryPage
