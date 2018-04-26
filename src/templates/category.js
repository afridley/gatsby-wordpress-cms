import Link from 'gatsby-link'
import get from 'lodash/get'
import React from 'react'
import Helmet from 'react-helmet'
import config from '../../config/SiteConfig'
import { rhythm } from '../utils/typography'
import Pagination from '../components/Pagination'
import PostListing from '../components/PostListing'

const Categories = ({ data, pathContext }) => {
  const { category, nodes, page, prev, next, pages, total, limit } = pathContext
  const { totalCount } = data.allWordpressPost
  const categoryHeader = `${totalCount} post${totalCount === 1 ? '' : 's'} filed in "${category}"`

  return (
    <div>
      <Helmet title={`${category} | ${config.title}`} />
      <h1>{categoryHeader}</h1>
      <PostListing postEdges={nodes} />
      <Pagination page={page} pages={pages} prev={prev} next={next} />
    </div>
  )
}

export default Categories

export const pageQuery = graphql`
  query CategoryPage($category: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    allWordpressPost(
      sort: { fields: [date], order: DESC }
      filter: { categories: { name: { eq: $category } } }
    ) {
      totalCount
      edges {
        node {
          featured_media {
            source_url
          }
          author {
            name
            avatar_urls {
              wordpress_24
              wordpress_48
              wordpress_96
            }
          }
          date(formatString: "MMMM DD, YYYY")
          slug
          title
          excerpt
          id
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
