import React from "react"
import { Link } from "gatsby"

import { MDBBtn, MDBCol, MDBIcon, MDBJumbotron, MDBRow } from "mdbreact"

import { FaYoutube } from "react-icons/fa"

import logo from "../images/blake-logo-108x70.png"

const Jumbotron = () => {
  return (
    <MDBJumbotron style={{ padding: 0 }}>
      <MDBCol className="bg-img text-center">
        <MDBRow className="site-intro blake-title">
          <div>
            <h1>
              <div className="blake-title blake">
                <span>BLAKE<img src={logo} className="logo" alt="Logo"/>JAMIESON</span>
              </div>
            </h1>
            <h2>
              <div className="blake-title tag1">SUPPORT</div>
              <div className="blake-title tag2">LIVING</div>
              <div className="blake-title tag3">ARTISTS</div>
            </h2>
          </div>
        </MDBRow>

          <div className="actions">
            <div className="you-tube-plug">
              <a href="https://www.youtube.com/user/BlakeJamieson?sub_confirmation=1" className="social-link nav-link waves-effect waves-light" target="_blank" rel="noreferrer">
                <FaYoutube className="social-icon fa-5x"></FaYoutube>
              </a>
              <div className="pitch">
                <h4>Subscribe to my YouTube Channel</h4>
                <p>Live Streams Mon-Fri at 10:23pm Eastern</p>
              </div>
            </div>
            <div className="featured-link">
              <Link to="/merch/topps2020">
                <MDBBtn color="grey">
                  Project 2020 Cards
                  <MDBIcon icon="caret-right" className="ml-2" />
                </MDBBtn>
              </Link>
            </div>
          </div>

      </MDBCol>
    </MDBJumbotron>
  )
}

export default Jumbotron
