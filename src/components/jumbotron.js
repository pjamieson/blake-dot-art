import React from "react"
import { Link } from "gatsby"

import { MDBBtn, MDBCol, MDBIcon, MDBJumbotron, MDBRow } from "mdbreact"

import { FaYoutube } from "react-icons/fa"

const Jumbotron = () => {
  return (
    <MDBJumbotron style={{ padding: 0 }}>
      <MDBCol className="bg-img text-center">
        <MDBRow className="site-intro blake-title">
          <div>
            <h1>BLAKE JAMIESON</h1>
            <h2>
              <span className="tag1">SUPPORT</span>
              <span className="tag2"> LIVING </span>
              <span className="tag3">ARTISTS</span>
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
            <Link to="/topps2020">
              <MDBBtn color="secondary">
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
