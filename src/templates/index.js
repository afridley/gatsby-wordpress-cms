import React from 'react'
import Helmet from 'react-helmet'
import config from '../../config/SiteConfig'
import Header from '../components/Header'
import Layout from '../components/Layout'
import Pagination from '../components/Pagination'
import PostListing from '../components/PostListing'

const IndexPage = ({ data, pageContext }) => {
  const { nodes, page, prev, next, pages, total, limit } = pageContext

  return (
    <Layout>
      <Helmet>
        <title={config.title} />
        <meta name="robots" content="noindex, nofollow">
      </Helmet>
      <Header />
      <PostListing postEdges={nodes} />
      <Pagination page={page} pages={pages} prev={prev} next={next} />
    </Layout>
  )
}

export default IndexPage
