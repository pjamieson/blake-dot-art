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
      tradingcards: allStrapiTradingcard(
        filter: {qty: {gt: 0}}
      ) {
        nodes {
          project_2020_player {
            name
          }
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
  const tradingcards = result.data.tradingcards.nodes;
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

  // Create tradingcard detail pages
  tradingcards.forEach((card) => {
    if (card.project_2020_player && card.project_2020_player.name && card.project_2020_player.name.length > 1) {
      createPage({
        path: `/topps/project2020/${card.slug}`,
        component: path.resolve(`./src/templates/tradingcard.js`),
        context: {
          slug: card.slug,
        },
      })
    }

  })

  // Create Player pages
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
        path: `/topps/project2020/${slug}`,
        component: path.resolve(`./src/templates/2020player.js`),
        context: {
          name: p2020player.name,
        },
      })
    })

}
