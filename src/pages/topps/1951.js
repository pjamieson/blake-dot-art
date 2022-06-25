import React, { useState } from "react"
import { graphql } from "gatsby"
import { MDBBtn, MDBInput } from "mdb-react-ui-kit"

import Layout from "../../components/layout"
import Seo from "../../components/seo"
import CardImageCaptionLink from "../../components/card-image-caption-link"

const Topps1951Page = ({ location, data }) => {
  const {
    allStrapiTopps1951Player: { nodes: players },
    allStrapiTradingcard: { nodes: t1951cards }
  } = data

  const [password, setPassword] = useState('')

  const protectPlayerIndex = 0 // 0 = Wave 1)
  const protectPassword = "mailmonday"

  const [playerProtected, setPlayerProtected] = useState(false)

  // If passed a player, open to that player. Otherwise open first player on list.
  const [ndx, setNdx] = useState(location.state && location.state.player ?
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

  const seo_description = "Illustrates artist-autographed baseball cards from the set Topps 1951 by Blake Jamieson (released in 2021) offered for sale, sorted by player."

  return (
    <Layout>
      <Seo title="Topps 1951 by Blake Jamieson" description={seo_description} />
      <div className="container page-container">
        <h1 className="page-head">Topps 1951 by Blake Jamieson</h1>
        <section className="topps">

          {<div className="btn-container">
            <hr/>
            {players.map((player, index) => {
              return (
                <div key={index}>
                  <button className={`std-btn ${index === ndx && "active-btn"}`} onClick={() => setNdx(index)}>{player.name}</button>
                </div>
              )
            })}
          </div>}
          {/*console.log("protectPlayerIndex, ndx", protectPlayerIndex, ndx)*/}
          <article className="content-container gallery">
            { (protectPlayerIndex === ndx && playerProtected) &&
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
            { (!playerProtected || protectPlayerIndex !== ndx) &&
              <div className="uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid="masonry: true">
                {t1951cards.map((card) => {
                  return (
                    card.topps_1951_player && card.topps_1951_player.name === players[ndx].name ?
                     <div key={card.identifier}>
                      <CardImageCaptionLink item={card} caption_format="Card" /></div> : null
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
        title
        subtitle
        limitation
        qty
      }
    }
  }
`

export default Topps1951Page
