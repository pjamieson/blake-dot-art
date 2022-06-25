import React from "react"
import { graphql } from "gatsby"

import ReactMarkdown from "react-markdown";
import { FaTwitter } from "react-icons/fa"

import Layout from "../../components/layout"
import Seo from "../../components/seo"

import { getImageUrl } from "../../utils/image-url"

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

                  <img className="img-fluid rounded"
                    src={getImageUrl(member.image, "medium")}
                    alt={member.name} />

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
          formats {
            large {
              url
            }
            medium {
              url
            }
            small {
              url
            }
            thumbnail {
              url
            }
          }
          height
          localFile {
            publicURL
          }
          width
          url
        }
        image_credit
        twitter_url
        bio
      }
    }
  }
`

export default TeamPage
