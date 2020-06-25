import React from "react"
import { graphql } from "gatsby"

import Layout from "../../components/layout"
import CardTitle from "../../components/card-title"

const OtherSubjectsPortfolioPage = ({ data }) => {
  const {
    allContentfulPainting: { nodes: paintings },
  } = data

  return (
    <Layout>
      <div className="container page-container">
        <h1>Portfolio - Other Subjects</h1>
        <h4 className="nfs">(Sold or Not for Sale)</h4>
        <section className="gallery">
          <div className="uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid="masonry: true">
            {paintings.map(card => {
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
    allContentfulPainting(
      filter: {
        subgenre: {name: {eq: "Other Subjects"}},
        portfolio: {eq: true},
        available: {eq: false}
      }
    ) {
      nodes {
        title
        image {
          fluid {
            ...GatsbyContentfulFluid
          }
        }
      }
    }
  }
`

export default OtherSubjectsPortfolioPage
