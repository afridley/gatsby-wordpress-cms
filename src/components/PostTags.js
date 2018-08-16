import React, { Component } from 'react'
import { Link } from 'gatsby'
import _ from 'lodash'

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
      <div>
        {tags &&
          tags.map(tag => (
            <Link key={tag} to={`/tag/${_.kebabCase(tag)}`}>
              {tag}
            </Link>
          ))}
      </div>
    )
  }
}

export default PostTags
