import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import React from 'react'
import Helmet from 'react-helmet'
import Header from '../components/Header'
import Layout from '../components/Layout'
import config from '../../config/SiteConfig'
import { rhythm } from '../utils/typography'
import Pagination from '../components/Pagination'
import PostListing from '../components/PostListing'

const Tags = ({ pageContext, data }) => {
  const { tag, nodes, page, prev, next, pages, total, limit } = pageContext
  const { totalCount } = data.allWordpressPost
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } filed in "${tag}"`

  return (
    <Layout>
      <Helmet>
        <title>{`${tag} | ${config.title}`}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Header />
      <h1>{tagHeader}</h1>
      <PostListing postEdges={nodes} />
      <Pagination page={page} pages={pages} prev={prev} next={next} />
    </Layout>
  )
}

export default Tags

export const pageQuery = graphql`
  query TagPage($tag: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    allWordpressPost(
      sort: { fields: [date], order: DESC }
      filter: { tags: { name: { eq: $tag } } }
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
