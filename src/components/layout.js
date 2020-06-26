import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Seo from "./seo"
import Navbar from "./navbar"
import Footer from "./footer"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        info: siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Seo title="Home" />
      <div className="site">
        <Navbar siteTitle={data.site.info.title} />
        <main className="site-content">{children}</main>
        <Footer />
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
