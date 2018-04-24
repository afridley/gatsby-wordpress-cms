const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const slugify = require('slug')
const { createFilePath } = require('gatsby-source-filesystem')
const { createPaginationPages } = require('gatsby-pagination')

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const indexPage = path.resolve('./src/templates/index.js')
    const blogPostTemplate = path.resolve('./src/templates/blog-post.js')
    const categoryPageTemplate = path.resolve('./src/templates/category.js')
    const tagPageTemplate = path.resolve('./src/templates/tag.js')

    resolve(
      graphql(
        `
          {
            allWordpressPost(
              sort: { fields: [date], order: DESC }
            ) {
              edges {
                node {
                  id
                  title
                  slug
                  date(formatString: "MMMM DD, YYYY")
                  excerpt
                  status
                  template
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

        // Create paginated index page
        createPaginationPages({
          createPage: createPage,
          edges: posts,
          component: indexPage,
          limit: 10,
        })

        // Create post pages
        _.each(posts, (post, index) => {
          const previous =
            index === posts.length - 1 ? false : posts[index + 1].node
          const next = index === 0 ? false : posts[index - 1].node

          createPage({
            path: `/${post.node.slug}/`,
            component: blogPostTemplate,
            context: {
              id: post.node.id,
              slug: post.node.slug,
              previous,
              next,
            },
          })
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

          // Create paginated tag pages
          const tagList = Array.from(tagSet)
          tagList.forEach(tag => {
            const tagFormatter = tag => route => `/tag/${_.kebabCase(tag)}/${route !== 1 ? route : ''}`
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

          // Create paginated category pages
          const categoryList = Array.from(categorySet)
          categoryList.forEach(category => {
            const categoryFormatter = category => route => `/category/${_.kebabCase(category)}/${route !== 1 ? route : ''}`
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
        resolve()
      })
    )
  })
}
