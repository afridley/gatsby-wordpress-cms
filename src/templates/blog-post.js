import Link from 'gatsby-link'
import get from 'lodash/get'
import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Bio from '../components/Bio'
import PostTags from '../components/PostTags'
import { rhythm, scale } from '../utils/typography'

class BlogPostTemplate extends Component {
  render() {
    const post = this.props.data.wordpressPost
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const { previous, next } = this.props.pathContext

    return (
      <div>
        <Helmet title={`${post.title} | ${siteTitle}`} />
        <h1 dangerouslySetInnerHTML={{ __html: post.title }} />
        <p
          style={{
            ...scale(-1 / 5),
            display: 'block',
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
          }}
        >
          {post.date}
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
        <div>
          <h4>More Like This:</h4>
          <PostTags tags={post.tags} />
        </div>
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Bio />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />

        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0,
          }}
        >
          {previous && (
            <li>
              <Link to={previous.slug} rel="prev">
                ← {previous.title}
              </Link>
            </li>
          )}

          {next && (
            <li>
              <Link to={next.slug} rel="next">
                {next.title} →
              </Link>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query currentPostQuery($id: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    wordpressPost(id: { eq: $id }) {
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
      title
      content
      categories {
        name
      }
      tags {
        name
      }
      date(formatString: "MMMM DD, YYYY")
    }
  }
`
