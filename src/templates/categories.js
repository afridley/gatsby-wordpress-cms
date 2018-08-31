import { graphql } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'
import config from '../../config/SiteConfig'
import PageTitle from '../components/PageTitle'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Layout from '../components/Layout'
import Menu from '../components/Menu'
import Pagination from '../components/Pagination'
import PostListing from '../components/PostListing'
import colors from '../utils/colors'
import fonts from '../utils/fonts'
import presets from '../utils/presets'

const Categories = ({ data, pageContext }) => {
  const { category, nodes, page, prev, next, pages } = pageContext
  const { totalCount } = data.allWordpressPost
  const categoryHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } filed in "${category}"`

  return (
    <Layout>
      <div
        className="archive"
        css={{
          [presets.mdDown]: {
            marginLeft: '5%',
            marginRight: '5%',
          },
          [presets.mdUp]: {
            display: 'grid',
            gridTemplateColumns: '5% 5% 20% 10% 10% 10% 10% 20% 5% 5%',
            gridTemplateRows: '80px 35%',
            alignItems: 'end',
          },
        }}
      >
      <Helmet title={`${category} | ${config.title}`} />
        <Menu />
        <Header />
        <PageTitle title={categoryHeader} />
        <div
          className="page__cover"
          css={{
            position: 'relative',
            marginTop: '10px',
            [presets.mdUp]: {
              gridColumn: '5 / 11',
              gridRow: '1 / 4',
              marginTop: 0,
              objectFit: 'cover',
              objectPosition: 'center center',
              width: '100%',
              height: '100%',
            },
            [presets.lgUp]: {
              gridColumn: '4 / 11',
            },
            '& .gatsby-image-outer-wrapper': {
              width: '100%',
              height: '100%',
            },
          }}
        >
          <div />
        </div>
        <div
          id="main"
          className="page__main"
          css={{
            marginTop: '1em',
            [presets.mdUp]: {
              gridColumn: '3 / 9',
              gridRow: '4 / span 1',
              alignSelf: 'flex-start',
            },
            [presets.lgUp]: {
              gridColumn: '3 / 8',
            },
            [presets.xlUp]: {
              gridColumn: '3 / 7',
            },
          }}
        >
          <PostListing postEdges={nodes} />
          <Pagination page={page} pages={pages} prev={prev} next={next} />
        </div>
        <Footer />
      </div>
    </Layout>
  )
}

export default Categories

export const pageQuery = graphql`
  query CategoryPage($category: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    allWordpressPost(
      sort: { fields: [date], order: DESC }
      filter: { categories: { name: { eq: $category } } }
    ) {
      totalCount
      edges {
        node {
          featured_media {
            source_url
          }
          author {
            name
            avatar_urls {
              wordpress_24
              wordpress_48
              wordpress_96
            }
          }
          date(formatString: "MMMM DD, YYYY")
          title
          excerpt
          id
          categories {
            name
          }
          tags {
            name
          }
          fields {
            permalink
          }
        }
      }
    }
  }
`
