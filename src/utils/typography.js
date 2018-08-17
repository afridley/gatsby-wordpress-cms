import Typography from 'typography'
import Wordpress2016 from 'typography-theme-wordpress-2016'

Wordpress2016.overrideThemeStyles = () => ({
  'a.gatsby-resp-image-link': {
    boxShadow: 'none',
  },
  '.emoji': {
    width: '1em',
    height: '1em',
  },
})

delete Wordpress2016.googleFonts

const typography = new Typography(Wordpress2016)
const { rhythm, scale } = typography

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export { rhythm, scale, typography as default }
