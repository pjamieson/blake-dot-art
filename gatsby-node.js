exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(
    `
    query GetPaintings {
      paintings: allContentfulPainting {
        nodes {
           slug
        }
      }
    }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  const path = require('path')
  const paintings = result.data.paintings.nodes;

  // Create painting detail pages.
  paintings.forEach((painting) => {
    createPage({
      path: `/gallery/${painting.slug}`,
      component: path.resolve(`./src/templates/painting.js`),
      context: {
        slug: painting.slug,
      },
    })
  })

}
