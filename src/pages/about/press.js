import React from "react"
import { graphql } from "gatsby"

import ReactMarkdown from "react-markdown";

import Layout from "../../components/layout"
import Seo from "../../components/seo"

import { getImageUrl } from "../../utils/image-url"

const PressPage = ({ data }) => {
  const {
    allStrapiPress: { nodes: articles }
  } = data

  let articleIndex = 0;

  return (
    <Layout>
      <Seo title="Press" />
      <div className="container page-container press">
        <h1 className="page-head">Press</h1>
        <section className="members">
          <article className="content-container">
            {articles.map(article => {
              return <div className="card team-card" key={articleIndex++}>
                { (articleIndex % 2 === 1) &&
                  <div className="img-container">

                    <img className="img-fluid rounded"
                      src={getImageUrl(article.image, "medium")}
                      alt="Blake Jamieson in his studio" />

                    { article.image_credit && <p>{article.image_credit}</p> }
                  </div>
                }
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
                { (articleIndex % 2 === 0) &&
                  <div className="img-container alt">

                    <img className="img-fluid rounded"
                      src={getImageUrl(article.image, "medium")}
                      alt="Blake Jamieson in his studio" />

                    { article.image_credit && <p>{article.image_credit}</p> }
                  </div>
                }
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
      limit: 200,
      filter: {show: {eq: true}},
    	sort: {order: DESC, fields: order}
    ) {
      nodes {
        headline
        tease
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
        publication
        pub_date
        url
      }
    }
  }
`

export default PressPage
