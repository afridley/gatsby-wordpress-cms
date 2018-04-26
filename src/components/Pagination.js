import React from 'react'
import PaginationLink from './PaginationLink'

class Pagination extends React.Component {
  render() {
    const { page, pages, prev, next } = this.props
    return (
      <nav className="pagination">
        <PaginationLink
          url={prev}
          text="← Newer Posts"
        />
        <span className="page-number">
          Page {page} of {pages}
        </span>
        <PaginationLink
          url={next}
          text="Older Posts →"
        />
      </nav>
    )
  }
}

export default Pagination
