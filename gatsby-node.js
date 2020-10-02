exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(
    `
    query GetAvailableItems {
      paintings: allStrapiPainting {
        nodes {
          subgenre {
            slug
          }
          qty
          slug
        }
      },
      p2020cards: allStrapiTradingcard(
        filter: {qty: {gt: 0}}
      ) {
        nodes {
          slug: identifier
        }
      },
      p2020players: allStrapiProject2020Player(
        limit: 20
      ) {
        nodes {
          name
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
  const p2020players = result.data.p2020players.nodes;

  // Create painting detail pages.
  paintings.forEach((painting) => {
    const section = painting.qty > 0 ? '/gallery/' : '/portfolio/'
    createPage({
      path: `${section}${painting.subgenre.slug}/${painting.slug}`,
      component: path.resolve(`./src/templates/painting.js`),
      context: {
        slug: painting.slug,
      },
    })
  })

  // Create Project 2020 card detail pages.
  p2020cards.forEach((p2020card) => {
    createPage({
      path: `/topps2020/${p2020card.slug}`,
      component: path.resolve(`./src/templates/tradingcard.js`),
      context: {
        slug: p2020card.slug,
      },
    })
  })

  // Create Project 2020 Player pages
  const slugify = text =>
  text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')

    p2020players.forEach((p2020player) => {
      const slug = slugify(p2020player.name)
      //console.log("slug", slug)
      createPage({
        path: `/topps2020/${slug}`,
        component: path.resolve(`./src/templates/2020player.js`),
        context: {
          name: p2020player.name,
        },
      })
    })

}
