import React, { Component } from 'react'
import { Link } from 'gatsby'
import _ from 'lodash'
import { rhythm } from '../utils/typography'

class PostTags extends Component {
  constructor(props) {
    super(props)

    this.getTagNames = this.getTagNames.bind(this)
  }

  getTagNames() {
    const tagNames = []
    const { tags } = this.props
    tags.forEach(tag => {
      tagNames.push(tag.name)
    })
    return tagNames
  }

  render() {
    const tags = this.getTagNames()
    return (
      <div
        style={{
          marginBottom: rhythm(1),
        }}
      >
        {tags &&
          tags.map(tag => (
            <Link
              key={tag}
              to={`/tag/${_.kebabCase(tag)}`}
              style={{ marginRight: rhythm(1 / 2) }}
            >
              {tag}
            </Link>
          ))}
      </div>
    )
  }
}

export default PostTags
