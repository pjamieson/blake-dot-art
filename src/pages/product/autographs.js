import React, { useState } from "react"
import { graphql } from "gatsby"
import { MDBBtn, MDBInput } from "mdbreact"

import Layout from "../../components/layout"
import SEO from "../../components/seo"
import CardProduct from "../../components/card-product"

const AutographsPage = ({ location, data }) => {
  const {
    allStrapiProduct: { nodes: products },
  } = data

  const pageTitle = `Autographs Through the Mail`

  const [pageProtected, setPageProtected] = useState(false)
  const [password, setPassword] = useState('')

  const protectPassword = "Aubrey"

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
      <SEO title={pageTitle} />
      <div className="container page-container">
        <h1 className="page-head">{pageTitle}</h1>
        <section className="topps">
          <article className="content-container">
            { pageProtected &&
              <div className="card protected-card">
                <h5 className="card-header primary-color white-text text-center py-4">
                  <strong>Password-Protected Page</strong>
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
                {products.map((product) => {
                  return (
                     <div className="p2020" key={product.identifier}>
                      <CardProduct product={product} category={product.product_category.slug} />
                    </div>
                  )
                })}
              </div>
            }
          </article>
        </section>
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    allStrapiProduct(
      limit: 300,
      sort: {
        order: ASC, fields: order
      }
    ) {
      nodes {
        product_category {
          name
          slug
        }
        strapiId
        identifier
        images {
          localFile {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        title: name
        subtitle: subhead
        qty
      }
    }
  }
`

export default AutographsPage
