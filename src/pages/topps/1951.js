import React, { useState } from "react"
import { graphql } from "gatsby"
import { MDBBtn, MDBInput } from "mdbreact"

import Layout from "../../components/layout"
import SEO from "../../components/seo"
import CardTopps from "../../components/card-topps"

const Topps1951Page = ({ location, data }) => {
  const {
    allStrapiTopps1951Player: { nodes: players },
    allStrapiTradingcard: { nodes: t1951cards }
  } = data

  const series = "1951"

  const [password, setPassword] = useState('')

  const protectPlayerIndex = 0 // 0 = Wave 1)
  const protectPassword = "mailmonday"

  const [playerProtected, setPlayerProtected] = useState(false)

  // If passed a player, open to that player. Otherwise open first player on list.
  const [value, setValue] = React.useState(location.state && location.state.player ?
    players.findIndex(s => s.name === location.state.player) : 0)

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
      <SEO title="Topps 1951 by Blake Jamieson" />
      <div className="container page-container">
        <h1 className="page-head">Topps 1951 by Blake Jamieson</h1>
        <section className="topps">

          {<div className="btn-container">
            <hr/>
            {players.map((player, index) => {
              return (
                <div key={index}>
                  <button className={`std-btn ${index === value && "active-btn"}`} onClick={() => setValue(index)}>{player.name}</button>
                </div>
              )
            })}
          </div>}

          <article className="content-container">
            { (protectPlayerIndex === value && playerProtected) &&
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
            { (!playerProtected || protectPlayerIndex !== value) &&
              <div className="uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid="masonry: true">
                {t1951cards.map((card) => {
                  return (
                    card.topps_1951_player && card.topps_1951_player.name === players[value].name ?
                     <div className="p2020" key={card.identifier}>
                      <CardTopps card={card} series={series} /></div> : null
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
    allStrapiTopps1951Player(
      limit: 20,
      sort: { order: DESC, fields: order }
    ) {
      nodes {
        name
      }
    },
    allStrapiTradingcard(
      limit: 300,
      filter: {
        topps_1951_player: {id: {gt: 0}}
      },
      sort: {
        order: ASC, fields: order
      }
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

export default Topps1951Page