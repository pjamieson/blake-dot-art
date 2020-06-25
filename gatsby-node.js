exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(
    `
    query GetGalleryPaintings {
      paintings: allContentfulPainting(
        filter: {
          available: {eq: true}
        }
      ) {
        nodes {
          subgenre {
            slug
          }
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
      path: `/gallery/${painting.subgenre.slug}/${painting.slug}`,
      component: path.resolve(`./src/templates/painting.js`),
      context: {
        slug: painting.slug,
      },
    })
  })

}
