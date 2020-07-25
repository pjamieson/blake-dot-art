import React from "react"
import { Link } from "gatsby"

import { MDBBtn, MDBIcon } from "mdbreact"

const HomeBtn = () => (
  <Link to="/">
    <MDBBtn className="float-left" color="indigo" rounded>
      <MDBIcon icon="caret-left" className="mr-2" />
      Return to Homepage
    </MDBBtn>
  </Link>
)

export default HomeBtn
