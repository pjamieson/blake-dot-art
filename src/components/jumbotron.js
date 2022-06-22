import React from "react"
//import { Link } from "gatsby"
//import { MDBBtn, MDBIcon } from "mdb-react-ui-kit"
import { FaYoutube } from "react-icons/fa"
import SocialLinks from "../constants/sociallinks"

const Jumbotron = () => {
  //const player = "Joey Votto" // used by Project70 link button
  return (
    <div className="bg-image">
      <SocialLinks />
      <div className="text-center">
        <div className="site-header">
          <div>
            <h1 className="headline">BLAKE JAMIESON</h1>
            <h2>
              <span className="tag1">SUPPORT</span>
              <span className="tag2"> LIVING </span>
              <span className="tag3">ARTISTS</span>
            </h2>
          </div>
        </div>

        { false &&
          <div className="front-promo">
            <h3>1951 Topps by Blake Jamieson - Week 4</h3>
            <h4>
              <i>Only available until February 10th at:&nbsp;</i>
              <a href="https://www.topps.com/cards-collectibles/online-brands/topps-1951.html" target="_blank" rel="noreferrer">Topps.com
              </a>
            </h4>
          </div>
        }

        <div className="actions">
          <div className="you-tube-plug">
            <a href="https://www.youtube.com/user/BlakeJamieson?sub_confirmation=1" className="social-link nav-link waves-effect waves-light" target="_blank" rel="noreferrer">
              <FaYoutube className="social-icon"></FaYoutube>
            </a>
            <div className="pitch">
              <h4>Subscribe to my YouTube Channel</h4>
              { false &&
                <p>Live Streams Mon, Wed & Fri at 10:23pm Eastern</p>
              }
            </div>
          </div>
          {/*
          <div className="featured-link">
            <Link to="/topps/project70/" state={{ player: player }}>
              <MDBBtn color="secondary">
                Topps Project70 Cards
                <MDBIcon icon="caret-right" className="ml-2" />
              </MDBBtn>
            </Link>
          </div>
          */}
        </div>

      </div>
    </div>
  )
}

export default Jumbotron
