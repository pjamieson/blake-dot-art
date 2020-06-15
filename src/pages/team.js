import React from "react"
import { Link, graphql } from "gatsby"
import Image from "gatsby-image"

import { MDBContainer } from "mdbreact"
import Layout from "../components/layout"

const TeamPage = ({ data }) => {
  const {
    allContentfulPainting: { nodes: paintings },
  } = data

  return (
    <Layout>
      <MDBContainer className="page-container">
        <h1>Gallery - Felix the Cat Series</h1>
        <section className="gallery card-columns">
          {paintings.map(painting => {
            return <article className="card" key={painting.id}>
              <div className="view overlay">
                <Image className="card-img-top" fluid={painting.image.fluid} alt={painting.title} />
                <Link to={`/gallery/${painting.slug}`}>
                  <div className="mask rgba-white-slight"></div>
                </Link>
              </div>
              <Link to={`/gallery/${painting.slug}`} className="btn-floating btn-action mdb-color lighten-3">
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
    allContentfulPainting {
      nodes {
        id
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

export default TeamPage
