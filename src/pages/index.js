import React from 'react'
import { graphql } from 'gatsby'
import { makeStyles } from '@material-ui/core/styles'
import TopLayout from '../components/TopLayout'
import { Container, Grid } from '@material-ui/core'

import MainFeaturedPost from '../components/MainFeaturedPost'
import SEO from '../components/SEO/SEO'
import Main from '../components/Main'
import Sidebar from '../components/SideBar'
const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}))
export default function Index({ data }) {
  const posts = data.allFlamelinkBlogPostContent.edges
  const questions = data.allFlamelinkQuestionAnswerContent.edges
  const UsortedpostEdges = [...posts, ...questions]
  const postEdges = UsortedpostEdges.slice().sort(
    (a, b) => new Date(b.node.date) - new Date(a.node.date)
  )

  const classes = useStyles()
  const pageTitle = 'HyBlog'
  return (
    <TopLayout>
      <SEO />
      <Container>
        <MainFeaturedPost postEdges={postEdges} />
        <Grid container spacing={5} className={classes.mainGrid}>
          <Main postEdges={postEdges} title={pageTitle} />
          <Sidebar />
        </Grid>
      </Container>
    </TopLayout>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    allFlamelinkBlogPostContent(
      limit: 2000
      sort: { fields: [date], order: DESC }
    ) {
      edges {
        node {
          title
          slug
          author
          category
          date
          flamelink_id
          summary
          tags
          coverImage {
            localFile {
              childImageSharp {
                fluid(webpQuality: 10) {
                  tracedSVG
                  srcWebp
                }
              }
            }
          }
        }
      }
    }
    allFlamelinkQuestionAnswerContent {
      edges {
        node {
          category
          date
          flamelink_id
          question
          questioner
          slug
          author
          summary
          coverImage {
            localFile {
              childImageSharp {
                fluid {
                  srcWebp
                }
              }
            }
          }
        }
      }
    }
  }
`
