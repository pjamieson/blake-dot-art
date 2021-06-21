import React, { useState } from "react"
import { graphql } from "gatsby"
import { MDBBtn, MDBInput } from "mdbreact"

import Layout from "../components/layout"
import Seo from "../components/seo"
import CardImageCaptionLink from "../components/card-image-caption-link"

const ToppsProject70PlayerPage = ({data}) => {
  const {
    allStrapiTradingcard: { nodes: p70cards }
  } = data

  const playerName = p70cards[0].project_70_player.name

  const pageTitle = `${playerName} - Topps Project 70 Cards`

  const [password, setPassword] = useState('')

  const protectPlayerName = "Jarred Kelenic"
  const protectPassword = "rookie"

  const [playerProtected, setPlayerProtected] = useState(true)

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
      setPlayerProtected(false)
    } else {
      setPassword('')
    }
  }

  return (
    <Layout>
      <Seo title={pageTitle} />
      <div className="container page-container">
        <h1 className="page-head">{p70cards[0].title}</h1>
        <h2 className="player-subhead">Topps Project 70 Cards by Blake Jamieson</h2>
        <section className="topps">
          <article className="content-container gallery">
            { (playerProtected && protectPlayerName === playerName) &&
              <div className="card protected-card">
                <h5 className="card-header primary-color white-text text-center py-4">
                  <strong>Password-Protected Autograph Editions</strong>
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
            { (!playerProtected || protectPlayerName !== playerName) &&
              <div className="uk-grid-small uk-child-width-1-2@s uk-child-width-1-4@m" uk-grid="masonry: true">
                {p70cards.map((card) => {
                  return (
                    <div key={card.identifier}>
                      <CardImageCaptionLink item={card} caption_format="Card" />
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
query GetP70PlayerTradingcards($name: String) {
  allStrapiTradingcard(
    filter: {project_70_player: {name: {eq: $name}}},
    sort: {order: ASC, fields: order}
  ) {
    nodes {
      strapiId
      identifier
      project_70_player {
        name
      }
      image {
        localFile {
          childImageSharp {
            gatsbyImageData(
              width: 600
              placeholder: BLURRED
              formats: [AUTO, WEBP]
            )
          }
        }
      }
      title
      subtitle
      limitation
      qty
    }
  }
}
`

export default ToppsProject70PlayerPage
