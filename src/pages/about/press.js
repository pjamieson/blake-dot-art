import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import ReactMarkdown from "react-markdown";

import Layout from "../../components/layout"
import SEO from "../../components/seo"

const PressPage = ({ data }) => {
  const {
    allStrapiPress: { nodes: articles }
  } = data

  return (
    <Layout>
      <div className="container page-container team">
        <SEO title="Press" />
        <h1 className="page-head">Press</h1>

        <section className="members">
          <article className="content-container">
            {articles.map(article => {
              return <div className="card team-card" key={article.id}>
                <div className="img-container">
                  <Img fluid={article.image.childImageSharp.fluid} className="card" />
                  { article.image_credit && <p>{article.image_credit}</p> }
                </div>
                <div>
                  <h2>
                    {article.headline}
                  </h2>
                  {article.pub_date && <p className="press-date">{article.pub_date}</p>}
                  <ReactMarkdown source={article.tease} />
                  <div className="press-link">
                    { (article.url && article.publication) &&
                      <a href={article.url} target="_blank" rel="noreferrer">
                        Full Article at {article.publication}
                      </a>
                    }
                    { (article.url && !article.publication) &&
                      <a href={article.url} target="_blank" rel="noreferrer">
                        Link to Full Article
                      </a>
                    }
                  </div>
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
    allStrapiPress (
      filter: {show: {eq: true}},
    	sort: {order: DESC, fields: order}
    ) {
      nodes {
        headline
        tease
        image {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
        publication
        pub_date
        url
      }
    }
  }
`

export default PressPage
