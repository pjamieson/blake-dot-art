import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../../components/layout"
import { FaTwitter } from "react-icons/fa"

// Begin needed for Rich Text
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

const Bold = ({ children }) => <span className="bold">{children}</span>
const Text = ({ children }) => <p className="align-center">{children}</p>

const options = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
  },
}
// End needed for Rich Text

const TeamPage = ({ data }) => {
  const {
    allContentfulTeamMember: { nodes: members }
  } = data

  const [value, setValue] = React.useState(0)

  const {
    name,
    image,
    imageCredit = {},
    bio,
    twitter = {}
  } = members[value]

  return (
    <Layout>
      <div className="container page-container">
        <h1 className="page-head">#TeamBlake</h1>

        <section className="members">

            <div className="btn-container">
              <hr/>
              {members.map((member, index) => {
                return (
                  <button className={`std-btn ${index === value && "active-btn"}`} onClick={() => setValue(index)}>{member.name}</button>
                )
              })}
            </div>

            <article className="content-container">
              <div className="img-container">
                  <Img fluid={image.fluid} />
                  { imageCredit && <p>{imageCredit}</p> }
              </div>
              <div>
                <h2>
                  {name}
                  { twitter &&
                    <a href={twitter} className="social-link nav-link waves-effect waves-light" target="_blank" rel="noreferrer">
                      <FaTwitter className="social-icon fa-sm"></FaTwitter>
                    </a>
                    }
                </h2>
                {documentToReactComponents(bio.json, options)}
              </div>
            </article>

        </section>
      </div>

    </Layout>
  )
}

export const query = graphql`
  {
    allContentfulTeamMember(sort: {fields: order}) {
      nodes {
        name
        image {
          fluid {
            ...GatsbyContentfulFluid
          }
        }
        imageCredit
        bio {
          json
        }
        twitter
      }
    }
  }
`

export default TeamPage
