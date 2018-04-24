import Link from 'gatsby-link';
import get from 'lodash/get';
import React from 'react';
import Helmet from 'react-helmet';
import config from '../../config/SiteConfig';
import { rhythm } from '../utils/typography';
import Pagination from '../components/Pagination';
import PostListing from '../components/PostListing';

const Tags = ({ pathContext, data }) => {
  const { tag, nodes, page, prev, next, pages, total, limit } = pathContext
  const { edges, totalCount } = data.allWordpressPost
  const tagHeader = `${totalCount} post${totalCount === 1 ? '' : 's'} filed in "${tag}"`

  return (
    <div>
      <Helmet title={`${tag} | ${config.title}`} />
      <h1>{tagHeader}</h1>
      <PostListing postEdges={edges} />
      <Pagination page={page} pages={pages} prev={prev} next={next} />
    </div>
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
