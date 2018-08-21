const config = require('./config/SiteConfig')

const pathPrefix = config.pathPrefix === '/' ? '' : config.pathPrefix

module.exports = {
  siteMetadata: {
    title: config.title,
    author: config.author,
    description: config.description,
    siteUrl: config.siteUrl + pathPrefix,
  },
  // pathPrefix: `/gatsby-test`,
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: `pages`,
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-glamor`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        baseUrl: `cms.mademistakes.com`,
        protocol: `https`,
        hostingWPCOM: false,
        useACF: true,
        excludedRoutes: ['/jetpack/**', '/*/*/settings'],
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allWordpressPost } }) => {
              return allWordpressPost.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  url: site.siteMetadata.siteUrl + edge.node.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.slug,
                  custom_elements: [{ 'content:encoded': edge.node.content }],
                })
              })
            },
            query: `
              {
                allWordpressPost(
                  sort: { order: DESC, fields: [date] },
                  filter: { status: { eq: "publish" } }
                ) {
                  edges {
                    node {
                      excerpt
                      content
                      slug
                      title
                      date
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
          },
        ],
      },
    },
  ],
}
