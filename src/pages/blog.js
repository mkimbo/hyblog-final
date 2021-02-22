import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'
import PostPreview from '../components/post-preview'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const IndexPage = ({ data }) => {
  const postEdges = data.allMarkdownRemark.edges
  return (
    <Layout>
      <SEO title="Blog" />
      <Grid container spacing={3} justify="center" align="center">
        <Grid item xs={12}>
          <div style={{ maxWidth: `100px`, marginBottom: `1.45rem` }}>
            <Image />
          </div>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">Latest Posts</Typography>
        </Grid>
      </Grid>

      <PostPreview postEdges={postEdges} />
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query BlogQuery {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [fields___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          id
          fields {
            slug
            date
          }
          frontmatter {
            title
            tags
            cover
            date
          }
        }
      }
    }
  }
`
