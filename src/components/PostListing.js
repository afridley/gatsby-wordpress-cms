import Link from 'gatsby-link';
import React from 'react';
import { rhythm } from '../utils/typography';

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
        mainCategory: postEdge.node.categories[0].name,
        featuredImageUrl:
          postEdge.node.featured_media !== null
            ? postEdge.node.featured_media.source_url
            : '',
        authorName: postEdge.node.author.name,
        authorAvatarUrl: postEdge.node.author.avatar_urls.wordpress_96
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
          <div key={post.id}>
            <h3
              style={{
                marginBottom: rhythm(1 / 4),
              }}
            >
              <Link style={{ boxShadow: 'none' }} to={post.path} key={post.title}>
                {post.title}
              </Link>
            </h3>
            {post.featuredImageUrl !== '' ? (
              <img
                className="featured-image"
                src={post.featuredImageUrl}
                alt=""
              />
            ) : (
              <div />
            )}
            <small>
              {post.date} in {post.mainCategory} by {post.authorName}
            </small>
            <p dangerouslySetInnerHTML={{ __html: post.excerpt }} />
          </div>
        ))}
      </div>
    )
  }
}

export default PostListing
