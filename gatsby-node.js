const redirects = require("./redirects.json");

exports.createPages = async ({ graphql, actions }) => {

  const { createRedirect } = actions
	redirects.forEach(redirect =>
		createRedirect({
	    fromPath: redirect.fromPath,
	    toPath: redirect.toPath,
	  })
	)

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
      products: allStrapiProduct {
        nodes {
          product_category {
            name
            slug
          }
          qty
          slug: identifier
        }
      },
      tradingcards: allStrapiTradingcard(
        filter: {qty: {gt: 0}}
      ) {
        nodes {
          project_2020_player {
            name
          }
          topps_1951_player {
            name
          }
          project_70_player {
            name
          }
          slug: identifier
        }
      },
      pcategories: allStrapiProductCategory(
        limit: 20
      ) {
        nodes {
          name
          slug
        }
      },
      p70players: allStrapiProject70Player(
        limit: 30
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
  const products = result.data.products.nodes;
  const tradingcards = result.data.tradingcards.nodes;
  const pcategories = result.data.pcategories.nodes;
  //const p2020players = result.data.p2020players.nodes;
  //const t1951players = result.data.t1951players.nodes;
  const p70players = result.data.p70players.nodes;

  // Create painting detail pages.
  paintings.forEach((painting) => {
    const section = painting.qty > 0 ? '/gallery/' : '/portfolio/'
    createPage({
      path: `${section}${painting.subgenre.slug}/${painting.slug}/`,
      component: path.resolve(`./src/templates/painting.js`),
      context: {
        slug: painting.slug,
      },
    })
  })

  // Create product detail pages.
  products.forEach((product) => {
    //console.log("*****product*****", product)
    createPage({
      path: `/product/${product.product_category.slug}/${product.slug}/`,
      component: path.resolve(`./src/templates/product.js`),
      context: {
        slug: product.slug,
      },
    })
  })

  // Create tradingcard detail pages
  tradingcards.forEach((card) => {

    if (card.project_2020_player && card.project_2020_player.name && card.project_2020_player.name.length > 1) {
      createPage({
        path: `/topps/project2020/${card.slug}/`,
        component: path.resolve(`./src/templates/tradingcard.js`),
        context: {
          series: `project2020`,
          slug: card.slug,
        },
      })
    }

    if (card.topps_1951_player && card.topps_1951_player.name && card.topps_1951_player.name.length > 1) {
      createPage({
        path: `/topps/1951/${card.slug}/`,
        component: path.resolve(`./src/templates/tradingcard.js`),
        context: {
          series: `1951`,
          slug: card.slug,
        },
      })
    }

    if (card.project_70_player && card.project_70_player.name && card.project_70_player.name.length > 1) {
      createPage({
        path: `/topps/project70/${card.slug}/`,
        component: path.resolve(`./src/templates/tradingcard.js`),
        context: {
          series: `project70`,
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

  pcategories.forEach((pcategory) => {
    //console.log("************************pcategory slug*******************", pcategory.slug)
    createPage({
      path: `/product/${pcategory.slug}/`,
      component: path.resolve(`./src/templates/pcategory.js`),
      context: {
        name: pcategory.slug,
      },
    })
  })

/* P2020 autos SOLD OUT - Don't need these pages anymore
  p2020players.forEach((p2020player) => {
    const slug = slugify(p2020player.name)
    //console.log("slug", slug)
    createPage({
      path: `/topps/project2020/${slug}/`,
      component: path.resolve(`./src/templates/2020player.js`),
      context: {
        name: p2020player.name,
      },
    })
  })
*/

/* 1951 autos SOLD OUT - Don't need these pages anymore
  t1951players.forEach((t1951player) => {
    const slug = slugify(t1951player.name)
    //console.log("slug", slug)
    createPage({
      path: `/topps/1951/${slug}/`,
      component: path.resolve(`./src/templates/1951player.js`),
      context: {
        name: t1951player.name,
      },
    })
  })
*/

  p70players.forEach((p70player) => {
    const slug = slugify(p70player.name)
    //console.log("slug", slug)
    createPage({
      path: `/topps/project70/${slug}/`,
      component: path.resolve(`./src/templates/p70player.js`),
      context: {
        name: p70player.name,
      },
    })
  })

}

/* queries no longer needed

p2020players: allStrapiProject2020Player(
  limit: 30
) {
  nodes {
    name
  }
},
t1951players: allStrapiTopps1951Player(
  limit: 60
) {
  nodes {
    name
  }
},

*/
