import React, { useState } from "react"
import { graphql } from "gatsby"
import { MDBBtn, MDBInput } from "mdbreact"

import Layout from "../../components/layout"
import SEO from "../../components/seo"
import CardImageLinkTitle from "../../components/card-image-link-title"

const CollabsGalleryPage = ({ data }) => {
  const {
    allStrapiPainting: { nodes: paintings },
  } = data

  const [password, setPassword] = useState('')

  const protectPassword = "gumclub"

  const [pageProtected, setPageProtected] = useState(false)

  const valid = () => {
    if (password.length > 5) {
      return true
    } else {
      return false
    }
  }

  const handleSubmit = async event => {
    event.preventDefault()
    event.target.className += " was-validated"

    if (password === protectPassword) {
      setPageProtected(false)
    } else {
      setPassword('')
    }
  }

  return (
    <Layout>
      <SEO title="Collabs Gallery" />
      <div className="container page-container">
        <h1>Gallery - Collabs</h1>
        <section className="gallery">
        { (pageProtected) &&
          <div className="card protected-card">
            <h5 className="card-header primary-color white-text text-center py-4">
              <strong>Password-Protected Gallery</strong>
            </h5>
            <div className="card-body px-lg-5 pt-0">
              <form className="text-center" onSubmit={(e) => handleSubmit(e)}>
                <div className="md-form">
                  <MDBInput type="password" id="password" className="form-control" label="Password" value={password} required onChange={(event) => setPassword(event.target.value)}/>
                </div>
                <div className="text-center">
                  <MDBBtn type="submit" id="submit" color="primary" disabled={!valid()}>
                    Submit
                  </MDBBtn>
                </div>
              </form>
            </div>
          </div>
        }
        { (!pageProtected) &&
          <div className="uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid="masonry: true">
            {paintings.map(card => {
              return <div key={card.identifier}>
                {card.image && <CardImageLinkTitle card={card} /> }
              </div>
            })}
          </div>
        }
        </section>
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    allStrapiPainting(
      filter: {
        subgenre: {name: {eq: "Collabs"}},
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
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
        slug
        qty
      }
    }
  }
`

export default CollabsGalleryPage
