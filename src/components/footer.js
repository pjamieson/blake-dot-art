import React from "react"
import { MDBContainer, MDBFooter } from "mdbreact"

const Footer = () => {
  return (
    <MDBFooter color="grey" className="font-small mt-4">
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          Created by{" "}
          <a
            href="https://patrickjamieson.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Patrick Jamieson
          </a>{" "}
          - Copyright © 2020 Blake Jamieson LLC. All rights reserved.
        </MDBContainer>
      </div>
    </MDBFooter>
  )
}

export default Footer
