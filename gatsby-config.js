require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: "blake [dot] art",
    description: "Gatsby gallery with Strapi",
    author: "Patrick Jamieson",
    data: ["item 1", "item 2"],
    person: { name: "Peter", age: 68 },
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "blake-dot-art",
        short_name: "blake",
        start_url: "/",
        background_color: "#663399",
        theme_color: "#663399",
        display: "minimal-ui",
        icon: "src/images/blake-logo-104x104.png",
      },
    },
    "gatsby-plugin-offline",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sass",
    "gatsby-plugin-sharp",
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
          "order",
          "painting",
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
