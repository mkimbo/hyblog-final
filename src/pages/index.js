import React from 'react'
import { graphql } from 'gatsby'
import classNames from 'classnames'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Parallax from '../components/parallax'
import PostPreview from '../components/post-preview'
import { Typography } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  hero: {
    height: '90vh',
    backgroundColor: 'rgba(17, 15, 139, 0.1)',
  },
  categories: {
    textAlign: 'center',
  },
  header: {
    textAlign: 'center',
  },
  headerText: {
    fontFamily: 'Roboto',
    color: 'hsla(0, 0%, 0%, 0.8)',
  },
  main: {
    background: '#FFFFFF',
    position: 'relative',
    zIndex: '3',
  },
  mainRaised: {
    margin: '-120px 75px 0px',
    padding: '0 50px 10px',
    background: 'rgba(234, 236, 238, 0.9)',
    borderRadius: '6px',
    boxShadow:
      '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
    [theme.breakpoints.down('md')]: {
      margin: '-100px 5px 0px',
      padding: '0 13px 5px',
    },
  },
}))

const IndexPage = ({ data }) => {
  const postEdges = data.allMarkdownRemark.edges
  const classes = useStyles()
  return (
    <Layout>
      <SEO title="Home" />

      <Parallax>
        <div className={classes.hero}></div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <Grid item xs={12} className={classes.header}>
          <Typography variant="h4">Latest Posts</Typography>
        </Grid>
        <PostPreview postEdges={postEdges} />
      </div>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [fields___date], order: DESC }
    ) {
      edges {
        node {
          excerpt(pruneLength: 150)
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
