import React from "react"
import { Link } from "gatsby"
import { MDBContainer, MDBFooter } from "mdbreact"
import SocialLinks from "../constants/sociallinks"

const Footer = () => {
  return (
    <MDBFooter color="grey" className="font-small mt-2">
      <div className="footer-copyright text-center py-3">
        <MDBContainer>
          <div>
            <SocialLinks styleClass="footer-links"></SocialLinks>
          </div>
          <div className="site-links">
            <Link className="" to="/privacy-policy/">Privacy Policy</Link>
            <Link className="" to="/terms/">Terms & Conditions</Link>
          </div>
          <div>
            Created by{" "}
            <a
              href="https://patrickjamieson.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Patrick Jamieson
            </a>{" "}
            - Copyright © {new Date().getFullYear()} Blake Jamieson LLC. All rights reserved.
          </div>
        </MDBContainer>
      </div>
    </MDBFooter>
  )
}

export default Footer
