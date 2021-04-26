import React, { useState } from "react"
import { graphql } from "gatsby"
import { MDBBtn, MDBInput } from "mdbreact"

import Layout from "../components/layout"
import SEO from "../components/seo"
import CardTopps from "../components/card-topps"

const ToppsProject70PlayerPage = ({data}) => {
  const {
    allStrapiTradingcard: { nodes: p70cards }
  } = data

  const series = "project70"

  const playerName = p70cards[0].project_70_player.name

  const pageTitle = `${playerName} - Topps Project 70 Cards`

  const [password, setPassword] = useState('')

  const protectPlayerName = "Ronald Acuña Jr"
  const protectPassword = "braves"

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
        <h1 className="page-head">{p70cards[0].title}</h1>
        <h2 className="player-subhead">Topps Project 70 Cards by Blake Jamieson</h2>
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
                {p70cards.map((card) => {
                  return (
                    <div className="p2020" key={card.identifier}>
                      <CardTopps card={card} series={series} />
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

export default ToppsProject70PlayerPage
