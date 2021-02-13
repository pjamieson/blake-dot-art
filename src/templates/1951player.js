import React, { useState } from "react"
import { graphql } from "gatsby"
import { MDBBtn, MDBInput } from "mdbreact"

import Layout from "../components/layout"
import SEO from "../components/seo"
import CardTopps from "../components/card-topps"

const Topps1951PlayerPage = ({data}) => {
  const {
    allStrapiTradingcard: { nodes: t1951cards }
  } = data

  const series = "1951"

  const playerName = t1951cards[0].topps_1951_player.name

  const pageTitle = `${playerName} - Topps 1951 by Blake Jamieson`

  const [password, setPassword] = useState('')

  const protectPlayerName = "Wave 1"
  const protectPassword = "mailmonday"

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
        <h1 className="page-head">{t1951cards[0].title}</h1>
        <h2 className="player-subhead">Topps 1951 Cards by Blake Jamieson</h2>
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
                {t1951cards.map((card) => {
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
query Get1951PlayerTradingcards($name: String) {
  allStrapiTradingcard(
    filter: {topps_1951_player: {name: {eq: $name}}},
    sort: {order: ASC, fields: order}
  ) {
    nodes {
      strapiId
      identifier
      topps_1951_player {
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

export default Topps1951PlayerPage
