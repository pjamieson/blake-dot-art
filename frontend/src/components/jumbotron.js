import React from "react"
import { Link } from "gatsby"
import {
  MDBBtn,
  MDBCol,
  MDBIcon,
  MDBJumbotron,
  MDBRow,
} from "mdbreact"

import logo from "../images/blake-logo-108x70.png"

const Jumbotron = () => {
  return (
    <MDBJumbotron style={{ padding: 0 }}>
      <MDBCol className="bg-img text-white text-center">
        <MDBCol className="py-5">
          <MDBRow className="blake-title">
            <h1>
              <div className="blake-title blake-title-start">BLAKE</div>
              <div className="blake-title blake-title-complete">
                <span><img src={logo} className="logo" alt="Logo"/>JAMIESON</span>
              </div>
            </h1>
            <h2>
              <div className="blake-title tag1">SUPPORT</div>
              <div className="blake-title tag2">LIVING</div>
              <div className="blake-title tag3">ARTISTS</div>
            </h2>
          </MDBRow>
          <div className="featured-link">
            <Link to="/autograph-request/">
              <MDBBtn color="primary" outline>
                Get Your Project 2020 Cards Autographed
                <MDBIcon icon="caret-right" className="ml-2" />
              </MDBBtn>
            </Link>
          </div>
        </MDBCol>
      </MDBCol>
    </MDBJumbotron>
  )
}

export default Jumbotron
