import { Link } from 'gatsby'
import _ from 'lodash'
import React, { Component } from 'react'

class PostCategories extends Component {
  constructor(props) {
    super(props)

    this.getCategoryNames = this.getCategoryNames.bind(this)
  }

  getCategoryNames() {
    const categoryNames = []
    const { categories } = this.props
    categories.forEach(category => {
      categoryNames.push(category.name)
    })
    return categoryNames
  }

  render() {
    const categories = this.getCategoryNames()
    return (
      <div>
        {categories &&
          categories.map(category => (
            <Link key={category} to={`/category/${_.kebabCase(category)}`}>
              {category}
            </Link>
          ))}
      </div>
    )
  }
}

export default PostCategories
