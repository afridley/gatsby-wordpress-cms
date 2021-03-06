const config = require('./config/SiteConfig')

const pathPrefix = config.pathPrefix === '/' ? '' : config.pathPrefix

module.exports = {
  siteMetadata: {
    title: config.title,
    author: config.author,
    description: config.description,
    siteUrl: config.siteUrl + pathPrefix,
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-glamor',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        // trackingId: 'ADD YOUR TRACKING ID HERE',
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        baseUrl: 'cms.mademistakes.com',
        protocol: 'https',
        hostingWPCOM: false,
        useACF: false,
        excludedRoutes: ['/jetpack/**', '/*/*/settings', '/postlight/**'],
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
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
                return Object.assign({}, edge.node, {
                  title: edge.node.title,
                  description: edge.node.excerpt,
                  url: site.siteMetadata.siteUrl + edge.node.fields.permalink,
                  guid: edge.node.id,
                  author: edge.node.author.name,
                  date: edge.node.date,
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
                      id
                      excerpt
                      content
                      title
                      date(formatString: "MMMM DD, YYYY")
                      fields {
                        permalink
                      }
                      author {
                        name
                      }
                      featured_media {
                        source_url
                      }
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
