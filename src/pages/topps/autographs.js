import React, { useState } from "react"
//import { graphql } from "gatsby"
//import { MDBBtn, MDBInput } from "mdbreact"

import Layout from "../../components/layout"
import SEO from "../../components/seo"
//import CardTopps2020 from "../../components/card-topps2020"

const AutographsPage = ({ location, data }) => {

  return (
    <Layout>
      <SEO title="Autographs by Return Mail" />
      <div className="container page-container">
        <h1 className="page-head">Autographs by Return Mail</h1>
        <section className="topps">
          <article className="content-container">
            <h2>Coming soon...</h2>
          </article>
        </section>
      </div>
    </Layout>
  )
}

export default AutographsPage
