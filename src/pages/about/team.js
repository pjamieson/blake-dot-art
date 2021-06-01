import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import ReactMarkdown from "react-markdown";
import { FaTwitter } from "react-icons/fa"

import Layout from "../../components/layout"
import Seo from "../../components/seo"

const TeamPage = ({ data }) => {
  const {
    allStrapiTeamMember: { nodes: members }
  } = data

  return (
    <Layout>
      <div className="container page-container team">
        <Seo title="Team" />
        <h1 className="page-head">#TeamBlake</h1>
        <section className="members">
          <article className="content-container">
            {members.map(member => {
              return <div className="card team-card" key={member.id}>
                <div className="img-container">
                  <GatsbyImage className="img-fluid rounded" image={getImage(member.image.localFile.childImageSharp.gatsbyImageData)} alt="Artist photo from article" />
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
      limit: 20,
      sort: {fields: order}
    ) {
      nodes {
        id
        name
        image {
          localFile {
            childImageSharp {
              gatsbyImageData(
                width: 600
                placeholder: BLURRED
                formats: [AUTO, WEBP]
              )
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
