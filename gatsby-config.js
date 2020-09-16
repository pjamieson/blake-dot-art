require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: "BLAKE.ART",
    description: "The Official Website of artist Blake Jamieson, offering original Pro Athlete Portraits and Pop Art, and autographed editions of the artist's Topps Project 2020 baseball cards.",
    author: "@patrickjamieson",
    twitterUsername: "@blakejamieson",
    image: "/static/BlakeCrownMask-95feca21dd9d7e285f52f75d8ca79c8a.jpg",
    siteUrl: "https://blake.art"
  },
  plugins: [
    {
      resolve: `gatsby-plugin-facebook-pixel`,
      options: {
        pixelId: "346895069791060",
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-175517133-1",
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "BLAKE.ART",
        short_name: "blake",
        start_url: "/",
        background_color: "#663399",
        theme_color: "#663399",
        display: "minimal-ui",
        icon: "src/images/blake-logo-104x104-amber.png",
      },
    },
    "gatsby-plugin-offline",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sass",
    "gatsby-plugin-sharp",
    "gatsby-plugin-sitemap",
    // You can have multiple instances of gatsby-source-filesystem
    // to read source nodes from different locations on the filesystem.
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-source-strapi",
      options: {
        apiURL: `${process.env.GATSBY_STRAPI_API_URL}`,
        contentTypes: [
          "client",
          "email",
          "order",
          "painting",
          "press",
          "product",
          "product-category",
          "project-2020-player",
          "sport",
          "subgenre",
          "team-member",
          "tradingcard",
        ],
        queryLimit: 1000,
      },
    },
    "gatsby-transformer-sharp",
  ],
}
