import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Jumbotron from "../components/jumbotron"
import CardImagelink from "../components/card-image-link"

import blake from "../images/BlakeCrownMask.jpg"


const IndexPage = ({ data }) => {
  const {
    allStrapiProject2020Card: { nodes: p2020cards },
    allStrapiPainting: { nodes: paintings },
  } = data

  return (
    <Layout>
      <div className="container">
        <Jumbotron />
        <div className="container front-content">

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
            <h3>Thanks for stopping by.</h3>
          </section>

          <section className="gallery">
            <div className="uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid="masonry: true">
              {p2020cards.map(p2020card => {
                return <div key={p2020card.identifier}>
                  <CardImagelink card={p2020card} />
                </div>
              })}
              {paintings.map(card => {
                return <div key={card.identifier}>
                  <CardImagelink card={card} />
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
    allStrapiProject2020Card(
      filter: {
        feature: {eq: true}
      }
    ) {
      nodes {
        identifier
        player: project_2020_player {
          name
        }
        image {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
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
        subgenre {
          name
          slug
        }
        sport {
          name
        }
        image {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
        available
      }
    }
  }
`

export default IndexPage
