import React from 'react'
import { Link, StaticQuery } from 'gatsby'
import config from '../../config/SiteConfig'
import { rhythm, scale } from '../utils/typography'

export default ({ children }) => (
  <div
    style={{
      maxWidth: rhythm(32),
      margin: `0 auto`,
      padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
    }}
  >
    {children}
  </div>
)
