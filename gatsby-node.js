const _ = require('lodash')
const moment = require('moment')
const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { createPaginationPages } = require('gatsby-pagination')

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `wordpress__POST`) {
    const nodePermalink = node.link
    const permalinkRegexp = /(http[s]?:\/\/)?([^\/\s]+\/)(.*)/
    const permalinkMatch = permalinkRegexp.exec(nodePermalink)
    createNodeField({ node, name: `permalink`, value: permalinkMatch[3] })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const indexPage = path.resolve('./src/templates/index.js')
    const blogPostTemplate = path.resolve('./src/templates/blog-post.js')
    const categoryPageTemplate = path.resolve('./src/templates/categories.js')
    const tagPageTemplate = path.resolve('./src/templates/tags.js')

    resolve(
      graphql(
        `
          {
            allWordpressPost(
              sort: { fields: [date], order: DESC }
              filter: { status: { eq: "publish" } }
            ) {
              edges {
                node {
                  id
                  title
                  link
                  slug
                  date(formatString: "MMMM DD, YYYY")
                  status
                  excerpt
                  fields {
                    permalink
                  }
                  featured_media {
                    source_url
                    localFile {
                      childImageSharp {
                        fluid(maxWidth: 750, quality: 90) {
                          base64
                          aspectRatio
                          src
                          srcSet
                          sizes
                        }
                      }
                    }
                  }
                  author {
                    name
                    avatar_urls {
                      wordpress_24
                      wordpress_48
                      wordpress_96
                    }
                  }
                  categories {
                    name
                  }
                  tags {
                    name
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allWordpressPost.edges
        const tags = []
        const categories = []

        // Create post pages
        _.each(posts, (post, index) => {
          // Grab all the tags and categories for later use
          post.node.tags.forEach(tag => {
            tags.push(tag.name)
          })
          post.node.categories.forEach(category => {
            categories.push(category.name)
          })
          // Setup previous and next post navigation
          const previous =
            index === posts.length - 1 ? null : posts[index + 1].node
          const next = index === 0 ? null : posts[index - 1].node

          createPage({
            path: `/${post.node.fields.permalink}`,
            component: blogPostTemplate,
            context: {
              id: post.node.id,
              slug: post.node.fields.permalink,
              previous,
              next,
            },
          })
        })

        // Create paginated index page
        createPaginationPages({
          createPage: createPage,
          edges: posts,
          component: indexPage,
          limit: 5,
        })

        const tagSet = new Set()
        const tagMap = new Map()
        const categorySet = new Set()
        const categoryMap = new Map()

        posts.forEach(edge => {
          // Associate posts to tags
          edge.node.tags.forEach(tag => {
            tagSet.add(tag.name)
            const array = tagMap.has(tag.name) ? tagMap.get(tag.name) : []
            array.push(edge)
            tagMap.set(tag.name, array)
          })

          // Assoicate posts to categories
          edge.node.categories.forEach(category => {
            categorySet.add(category.name)
            const array = categoryMap.has(category.name)
              ? categoryMap.get(category.name)
              : []
            array.push(edge)
            categoryMap.set(category.name, array)
          })
        })

        const tagList = Array.from(tagSet)
        const categoryList = Array.from(categorySet)

        tagList.forEach(tag => {
          // Create paginated tag pages
          const tagFormatter = tag => route =>
            `/tag/${_.kebabCase(tag)}/${route !== 1 ? route : ''}`
          createPaginationPages({
            createPage,
            edges: tagMap.get(tag),
            component: tagPageTemplate,
            pathFormatter: tagFormatter(tag),
            limit: 5,
            context: {
              tag,
            },
          })
        })

        categoryList.forEach(category => {
          // Create paginated category pages
          const categoryFormatter = category => route =>
            `/category/${_.kebabCase(category)}/${route !== 1 ? route : ''}`
          createPaginationPages({
            createPage,
            edges: categoryMap.get(category),
            component: categoryPageTemplate,
            pathFormatter: categoryFormatter(category),
            limit: 5,
            context: {
              category,
            },
          })
        })
      })
    )
  })
}
