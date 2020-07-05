import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import ReactMarkdown from "react-markdown";

import Layout from "../../components/layout"

const BlakePage = ({ data }) => {
  const {
    allStrapiTeamMember: { nodes: blake }
  } = data

  return (
    <Layout>
      <div className="container page-container team">
        <h1 className="page-head">About Blake</h1>

        <section className="members">
            <article className="content-container">
              <div className="img-container">
                  <Img fluid={blake[0].image.childImageSharp.fluid} className="card" />
                  { blake[0].image_credit && <p>{blake[0].image_credit}</p> }
              </div>
              <div>
                <h2>
                  {blake[0].name}
                </h2>
                <ReactMarkdown source={blake[0].bio} />
              </div>
            </article>
        </section>
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    allStrapiTeamMember(
      filter: {name: {eq: "Blake Jamieson"}}
    ) {
      nodes {
        name
        image {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
        image_credit
        bio
      }
    }
  }
`

export default BlakePage
