import React from "react"
import { Link } from "gatsby"
import SocialLinks from "../constants/sociallinks"

const Footer = () => {
  return (
    <footer className="blake-footer font-small mt-2">
      <div className="footer-copyright text-center py-3">
        <div>
          <SocialLinks styleClass="footer-links"></SocialLinks>
        </div>
        <div className="site-links">
          <Link className="" to="/privacy-policy/">Privacy Policy</Link>
          <Link className="" to="/terms/">Terms & Conditions</Link>
        </div>
        <div className="bottom-line">
          <div>
            <span className="muted">Created by&nbsp;</span>
            <a href="https://patrickjamieson.com" target="_blank" rel="noopener noreferrer">
              Patrick Jamieson
            </a>
          </div>
          <span className="muted">&nbsp;&nbsp;Copyright © {new Date().getFullYear()} Blake Jamieson LLC.&nbsp;&nbsp;</span>
          <span className="muted">All rights reserved.</span>
        </div>
        <Link className="" to="/admin/orders">Stay Awesome!</Link>
      </div>
    </footer>
  )
}

export default Footer
