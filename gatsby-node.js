exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(
    `
    query GetAvailableItems {
      paintings: allContentfulPainting(
        filter: {available: {eq: true}}) {
        nodes {
          subgenre {
            slug
          }
          slug
        }
      },
      p2020cards: allContentfulToppsP2020Card(
        filter: {qtyAvail: {gt: 0}}) {
        nodes {
          slug: identifier
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
  const p2020cards = result.data.p2020cards.nodes;

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

  // Create Project 2020 card detail pages.
  p2020cards.forEach((p2020card) => {
    createPage({
      path: `/merch/topps2020/${p2020card.slug}`,
      component: path.resolve(`./src/templates/project2020-card.js`),
      context: {
        slug: p2020card.slug,
      },
    })
  })

}
