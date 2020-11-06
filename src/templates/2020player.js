import React, { useState } from "react"
import { graphql } from "gatsby"
import { MDBBtn, MDBInput } from "mdbreact"

import Layout from "../components/layout"
import SEO from "../components/seo"
import CardTopps2020 from "../components/card-topps2020"

const ToppsProject2020PlayerPage = ({data}) => {
  const {
    allStrapiTradingcard: { nodes: p2020cards }
  } = data

  const playerName = p2020cards[0].project_2020_player.name

  const pageTitle = `${playerName} - Topps Project 2020 Cards`

  const [password, setPassword] = useState('')

  const protectPlayerName = "Derek Jeter"
  const protectPassword = "friday"

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
      <SEO title={pageTitle} />
      <div className="container page-container">
        <h1 className="page-head">{p2020cards[0].title}</h1>
        <h2 className="player-subhead">Topps Project 2020 Cards by Blake Jamieson</h2>
        <section className="topps">
          <article className="content-container">
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
              <div className="uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid="masonry: true">
                {p2020cards.map((card) => {
                  return (
                    <div className="p2020" key={card.identifier}>
                      <CardTopps2020 card={card} />
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
query GetPlayerTradingcards($name: String) {
  allStrapiTradingcard(
    filter: {project_2020_player: {name: {eq: $name}}},
    sort: {order: ASC, fields: order}
  ) {
    nodes {
      strapiId
      identifier
      project_2020_player {
        name
      }
      image {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
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

export default ToppsProject2020PlayerPage
