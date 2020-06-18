import React from "react"

import { MDBContainer } from "mdbreact"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import HomeBtn from "../../components/home-btn"
import ClientsGrid from "../../components/clients-grid"

const ClientsPage = () => (
  <Layout>
    <MDBContainer className="py-5 page-container">
      <SEO title="Clients & Collectors" />
      <h1 className="page-head">Clients & Collectors</h1>

      <ClientsGrid />

      <HomeBtn />
    </MDBContainer>
  </Layout>
)

export default ClientsPage
