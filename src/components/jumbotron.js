import React from "react"
import { Link } from "gatsby"

import { MDBBtn, MDBCol, MDBIcon, MDBJumbotron, MDBRow } from "mdbreact"

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
          <div className="featured-link">
            <Link to="/merch/topps2020">
              <MDBBtn color="grey">
                Project 2020 Cards
                <MDBIcon icon="caret-right" className="ml-2" />
              </MDBBtn>
            </Link>
          </div>
        </MDBRow>
      </MDBCol>
    </MDBJumbotron>
  )
}

export default Jumbotron
