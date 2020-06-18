import React from "react"
import { Link, graphql } from "gatsby"
import Image from "gatsby-image"

import { MDBContainer } from "mdbreact"
import Layout from "../../components/layout"

const OtherSubjectsGalleryPage = ({ data }) => {
  const {
    allContentfulPainting: { nodes: paintings },
  } = data

  return (
    <Layout>
      <MDBContainer className="page-container">
        <h1>{paintings[0].subcategory.category.name} - {paintings[0].subcategory.name}</h1>
        <section className="gallery card-columns">
          {paintings.map(painting => {
            return <article className="card" key={painting.identifier}>
              <div className="view overlay">
                <Image className="card-img-top" fluid={painting.image.fluid} alt={painting.title} />
                <Link to={`/${painting.subcategory.category.slug}/${painting.subcategory.slug}/${painting.slug}`}>
                  <div className="mask rgba-white-slight"></div>
                </Link>
              </div>
              <Link to={`/${painting.subcategory.category.slug}/${painting.subcategory.slug}/${painting.slug}`} className="btn-floating btn-action mdb-color lighten-3">
                <i className="fas fa-chevron-right pl-1"></i>
              </Link>
              <div className="card-body">
                <h4 className="card-title">{painting.title}</h4>
              </div>
            </article>
          })}
        </section>
      </MDBContainer>
    </Layout>
  )
}

export const query = graphql`
  {
    allContentfulPainting(
      filter: {
        subcategory: {name: {eq: "Other Subjects"}},
        sold: {eq: false}}
    ) {
      nodes {
        identifier
        subcategory {
          name
          slug
          category {
            name
            slug
          }
        }
        title
        image {
          fluid {
            ...GatsbyContentfulFluid
          }
        }
        slug
      }
    }
  }
`

export default OtherSubjectsGalleryPage
