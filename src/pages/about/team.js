import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import ReactMarkdown from "react-markdown";
import { FaTwitter } from "react-icons/fa"

import Layout from "../../components/layout"

const TeamPage = ({ data }) => {
  const {
    allStrapiTeamMember: { nodes: members }
  } = data

  return (
    <Layout>
      <div className="container page-container team">
        <h1 className="page-head">#TeamBlake</h1>
        <section className="members">
          <article className="content-container">
            {members.map(member => {
              return <div className="card team-card" key={member.id}>
                <div className="img-container">
                  <Img fluid={member.image.childImageSharp.fluid} className="card" />
                  { member.image_credit && <p>{member.image_credit}</p> }
                </div>
                <div>
                  <h2>
                    {member.name}
                    { member.twitter_url &&
                      <a href={member.twitter_url} className="social-link nav-link waves-effect waves-light" target="_blank" rel="noreferrer">
                        <FaTwitter className="social-icon fa-sm"></FaTwitter>
                      </a>
                    }
                  </h2>
                  <ReactMarkdown source={member.bio} />
                </div>
              </div>
            })}
          </article>
        </section>
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    allStrapiTeamMember(
      sort: {fields: order}
    ) {
      nodes {
        id
        name
        image {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
        image_credit
        twitter_url
        bio
      }
    }
  }
`

export default TeamPage
