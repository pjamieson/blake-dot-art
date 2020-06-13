import React from "react"
import { Link } from "gatsby"

import { MDBBtn, MDBIcon } from "mdbreact"

const HomeBtn = () => (
  <Link to="/">
    <MDBBtn color="primary" outline>
      <MDBIcon icon="caret-left" className="mr-2" />
      Go back to the homepage
    </MDBBtn>
  </Link>
)

export default HomeBtn
