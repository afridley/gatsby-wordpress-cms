import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../components/Layout'
import config from '../../config/SiteConfig'

const NotFoundPage = () => (
  <Layout>
    <Helmet title={`404 | ${config.title}`} />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Layout>
)

export default NotFoundPage
