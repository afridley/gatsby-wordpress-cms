import Img from 'gatsby-image'
import get from 'lodash/get'
import { graphql } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'
import PageTitle from '../components/PageTitle'
import PageMeta from '../components/PageMeta'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Layout from '../components/Layout'
import Menu from '../components/Menu'
import PostPagination from '../components/PostPagination'
import PostCategories from '../components/PostCategories'
import PostTags from '../components/PostTags'
import colors from '../utils/colors'
import fonts from '../utils/fonts'
import presets from '../utils/presets'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.wordpressPost
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const { previous, next } = this.props.pageContext

    return (
      <Layout>
        <div
          className="post"
          css={{
            [presets.mdUp]: {
              display: 'grid',
              gridTemplateColumns: '5% 5% 20% 10% 10% 10% 10% 20% 5% 5%',
              gridTemplateRows: '80px 100px 35%',
              alignItems: 'end',
            },
            [presets.mdDown]: {
              '& > *:not( .page__main )': {
                marginLeft: 'auto',
                marginRight: 'auto',
                paddingLeft: '5%',
                paddingRight: '5%',
                maxWidth: '768px',
              },
            },
          }}
        >
          <Helmet>
            <title>{`${post.title} | ${siteTitle}`}</title>
            <meta name="robots" content="noindex, nofollow" />
          </Helmet>
          <Menu />
          <Header />
          <PageTitle title={post.title} author={post.author} />
          <PageMeta date={post.date} />
          <div
            className="page__cover"
            css={{
              position: 'relative',
              marginTop: '10px',
              [presets.mdDown]: {
                maxWidth: '100%',
              },
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
            {post.featured_media !== null ? (
              <Img
                fluid={post.featured_media.localFile.childImageSharp.fluid}
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            ) : (
              <div />
            )}
          </div>
          <div
            id="main"
            className="page__main"
            css={{
              marginTop: '1em',
              // [presets.mdDown]: {
              //   maxWidth: '100%',
              // },
              [presets.mdUp]: {
                gridColumn: '1 / -1',
                alignSelf: 'flex-start',
              },
              [presets.lgUp]: {
                gridColumn: '1 / -1',
              },
            }}
          >
            <div
              css={{
                '& > *:not( .alignwide ):not( .alignfull )': {
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  paddingLeft: '5%',
                  paddingRight: '5%',
                  maxWidth: '740px',
                }
              }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
          <div
            className="page__aside"
            css={{
              [presets.mdDown]: {
                maxWidth: '90%',
              },
              [presets.mdUp]: {
                gridColumn: '3 / 9',
                alignSelf: 'start',
              },
            }}
          >
            <PostCategories categories={post.categories} />
            <PostTags tags={post.tags} />
            <PostPagination previous={previous} next={next} />
          </div>
          <Footer />
        </div>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query currentPostQuery($id: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    wordpressPost(id: { eq: $id }) {
      featured_media {
        source_url
        localFile {
          childImageSharp {
            fluid(maxWidth: 1280, quality: 90) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      author {
        name
      }
      title
      content
      categories {
        name
      }
      tags {
        name
      }
      date(formatString: "MMMM DD, YYYY")
    }
  }
`
