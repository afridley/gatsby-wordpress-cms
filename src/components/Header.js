import React from 'react'
import { Link } from 'gatsby'
import config from '../../config/SiteConfig'
import { rhythm, scale } from '../utils/typography'

class Header extends React.Component {
  render() {
    return (
      <header>
        <h3
          style={{
            fontFamily: 'Montserrat, sans-serif',
            marginTop: 0,
            marginBottom: rhythm(-1),
          }}
        >
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'inherit',
            }}
            to={'/'}
          >
            {config.title}
          </Link>
        </h3>
      </header>
    )
  }
}

export default Header
