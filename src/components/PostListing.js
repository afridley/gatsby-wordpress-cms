import { Link } from 'gatsby'
import kebabCase from 'lodash/kebabCase'
import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'

class PostListing extends React.Component {
  getPostList() {
    const postList = []
    this.props.postEdges.forEach(postEdge => {
      postList.push({
        id: postEdge.node.id,
        path: `/${postEdge.node.slug}`,
        title: postEdge.node.title,
        date: postEdge.node.date,
        excerpt: postEdge.node.excerpt,
        categories: postEdge.node.categories,
        mainCategory: postEdge.node.categories[0].name,
        featuredImage:
          postEdge.node.featured_media !== null
            ? postEdge.node.featured_media.localFile
            : '',
        authorName: postEdge.node.author.name,
        authorAvatarUrl: postEdge.node.author.avatar_urls.wordpress_96,
      })
    })
    return postList
  }

  render() {
    const postList = this.getPostList()
    return (
      <div>
        {/* Your post list here. */
        postList.map(post => (
          <div
            key={post.id}
            css={{
              marginBottom: '3em',
            }}
          >
            <h3
              css={{
                marginBottom: 0,
                fontWeight: 700,
                fontSize: '1.563em',
                lineHeight: 1.25,
              }}
            >
              <Link
                css={{ textDecoration: 'none' }}
                to={post.path}
                key={post.title}
              >
                {post.title}
              </Link>
            </h3>
            <div
              css={{
                marginBottom: '1em',
              }}
            >
              <small>
                {post.date} in{' '}
                {post.categories.map((category, i) => (
                  <span key={i}>
                    {!!i && ', '}
                    <Link to={`/category/${kebabCase(category.name)}`}>
                      {category.name}
                    </Link>
                  </span>
                ))}{' '}
                &middot; 2 min read
              </small>
            </div>
            {post.featuredImage !== '' ? (
              <Img
                fluid={post.featuredImage.childImageSharp.fluid}
                style={{ marginBottom: '1em' }}
              />
            ) : (
              <div />
            )}
            <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
          </div>
        ))}
      </div>
    )
  }
}

PostListing.propTypes = {
  postEdges: PropTypes.node.isRequired,
}

export default PostListing
