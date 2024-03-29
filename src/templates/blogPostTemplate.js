import React from 'react'
import { graphql } from 'gatsby'
import { makeStyles } from '@material-ui/core/styles'

import TopLayout from '../components/TopLayout'
import { Container, Grid, Typography, Hidden } from '@material-ui/core'
import MainArticleImage from '../components/MainArticleImage'
import SEO from '../components/SEO/SEO'
import MainArticleContent from '../components/MainArticleContent'
import Sidebar from '../components/SideBar'

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}))
export default function BlogPostTemplate({ data }) {
  const classes = useStyles()
  const postNode = data.flamelinkBlogPostContent
  const pageViews = data.pageViews ? data.pageViews.totalCount : 0
  const pageTitle = postNode.title

  return (
    <TopLayout>
      <SEO
        isBlogPost
        blog={postNode}
        postImage={
          postNode.coverImage[0].localFile
            ? postNode.coverImage[0].localFile.childImageSharp.fluid.srcWebp
            : null
        }
        pageTitle={pageTitle}
      />
      <Container>
        <Typography variant="h4" gutterBottom className={classes.title}>
          {pageTitle}
        </Typography>
        <MainArticleImage post={postNode} />
        <Grid container spacing={5} className={classes.mainGrid}>
          <MainArticleContent
            postNode={postNode}
            title={pageTitle}
            pageViews={pageViews}
          />
          <Hidden smDown>
            <Sidebar />
          </Hidden>
        </Grid>
      </Container>
    </TopLayout>
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!, $viewer: String!) {
    flamelinkBlogPostContent(slug: { eq: $slug }) {
      title
      date
      author
      summary
      category
      tags
      slug
      coverImage {
        localFile {
          name
          childImageSharp {
            fluid(maxHeight: 450, quality: 90) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
      articleText {
        content
        fields {
          readingTime {
            text
          }
        }
      }
    }
    pageViews(id: { eq: $viewer }) {
      totalCount
    }
  }
`
