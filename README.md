# Wordpress Gutenberg + Gatsby MVP

Test site built by Gatsby using [gatsby-source-wordpress](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-source-wordpress). Content from a headless Wordpress install, using [Gutenberg](https://wordpress.org/gutenberg/).

Headless Wordpress uses [postlight-headless-wp theme](https://github.com/postlight/headless-wp-starter/tree/master/wordpress/wp-content/themes/postlight-headless-wp) and the these [plugins](https://github.com/postlight/headless-wp-starter/tree/master/wordpress/wp-content/plugins).

- [x] Posts - paginated index
- [x] Category pages - paginated
- [x] Tag pages - paginated
- [x] Featured images
- [ ] Comments
- [ ] SEO (leverage Yoast plugin?) - OpenGraph, Twitter Cards, etc.
- [x] Trigger Netlify build on Wordpress content edits

## Development

1. Install [Yarn](https://yarnpkg.com/en/).
2. `yarn`
3. `gatsby develop`
