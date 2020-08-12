import React from "react"
import { graphql } from "gatsby"

import Layout from "../../components/layout"
import CardImageLinkTitle from "../../components/card-image-link-title"

const PopArtPortfolioPage = ({ data }) => {
  const {
    allStrapiPainting: { nodes: paintings },
  } = data

  return (
    <Layout>
      <div className="container page-container">
        <h1>Portfolio - Pop Art</h1>
        <h4 className="nfs">(Sold or Not for Sale)</h4>
        <section className="gallery">
          <div className="uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid="masonry: true">
            {paintings.map(card => {
              return <div key={card.identifier}>
                {card.image && <CardImageLinkTitle card={card} /> }
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
        subgenre: {name: {eq: "Pop Art"}},
        portfolio: {eq: true},
        available: {eq: false}
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
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
        slug
      }
    }
  }
`

export default PopArtPortfolioPage
