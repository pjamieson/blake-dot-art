import React from "react"
import { graphql } from "gatsby"

import Layout from "../../components/layout"
import CardImageTitle from "../../components/card-image-title"

const FelixPortfolioPage = ({ data }) => {
  const {
    allStrapiPainting: { nodes: paintings },
  } = data

  return (
    <Layout>
      <div className="container page-container">
        <h1>Portfolio - Felix the Cat Series</h1>
        <h4 className="nfs">(Sold or Not for Sale)</h4>
        <section className="gallery">
          <div className="uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid="masonry: true">
            {paintings.map(card => {
              return <div key={card.identifier}>
                <CardImageTitle card={card} />
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
        available: {eq: false}
      },
      sort: {
        fields: order, order: ASC
      }
    ) {
      nodes {
        identifier
        title
        image {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

export default FelixPortfolioPage
