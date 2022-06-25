import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Jumbotron from "../components/jumbotron"
import FeaturedImagelink from "../components/featured-image-link"

//import blake from "../images/BlakeCrownMask.jpg"

const IndexPage = ({ data }) => {
  const {
    allStrapiTradingcard: { nodes: tradingcards },
    allStrapiProduct: { nodes: products },
    allStrapiPainting: { nodes: paintings },
  } = data

  return (
    <Layout>
      <Seo title="Home" description="The official home page of the artist Blake Jamieson" />
      <div className="container site-container">
        <Jumbotron />
        <div className="container front-content">

          {/*
          <section className="intro-content">
            <div className="image-container">
              <img className="card" src={blake} alt="Blake wearing crown and mask" />
            </div>
            <h2>Welcome to blake [dot] art!</h2>
            <h3>My name is Blake. I paint. Mostly.</h3>
            <p className="lead dark-grey-text">
              Scroll down for a quick look at representative examples of my work. Tap or click on an image on this page to go directly to the <strong>Portfolio</strong> or <strong>Gallery</strong> that piece comes from.
            </p>
            <p className="lead dark-grey-text">
              Explore the menu links above for a more granular breakdown of my subjects and styles, with each linked page offering more examples.
            </p>
            <p className="lead dark-grey-text">
              <strong><em>Please note:</em></strong> Works shown in the <strong>Portfolio</strong> section have already been sold or are not for sale. Only items shown in the <strong>Gallery</strong> and <strong>Merch</strong> sections are available for purchase.
            </p>
            <h3>Thanks for stopping by. Stay Awesome!</h3>
          </section>
          */}

          <section className="gallery">
            <div className="uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m uk-text-center" uk-grid="masonry: true">
              {tradingcards.map(tradingcard => {
                return <div key={tradingcard.identifier}>
                  <FeaturedImagelink item={tradingcard} />
                </div>
              })}
              {products.map(product => {
                return <div key={product.identifier}>
                  <FeaturedImagelink item={product} />
                </div>
              })}
              {paintings.map(painting => {
                return <div key={painting.identifier}>
                  {painting.image && <FeaturedImagelink item={painting} />}
                </div>
              })}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    allStrapiTradingcard(
      filter: {
        feature: {eq: true}
      }
    ) {
      nodes {
        identifier
        title
        project_2020_player {
          name
        }
        topps_1951_player {
          name
        }
        project_70_player {
          name
        }
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
      }
    },
    allStrapiProduct(
      filter: {
        feature: {eq: true}
      }
    ) {
      nodes {
        identifier
        title: name
        product_category {
          name
          slug
        }
        images {
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
      }
    },
    allStrapiPainting(
      filter: {
        feature: {eq: true}
      },
      sort: {
        fields: order, order: ASC
      }
    ) {
      nodes {
        identifier
        title
        subgenre {
          name
          slug
        }
        sport {
          name
        }
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
        qty
      }
    }
  }
`

export default IndexPage
