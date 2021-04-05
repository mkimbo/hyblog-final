import React from 'react'
import { graphql } from 'gatsby'
import { makeStyles } from '@material-ui/core/styles'

import TopLayout from '../components/TopLayout'
import { Container, Grid } from '@material-ui/core'

import MainParticles from '../components/MainParticles'
import SEO from '../components/SEO/SEO'
import Main from '../components/Main'
import Sidebar from '../components/SideBar'

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}))
export default function Category({ data, pageContext }) {
  const posts = data.allFlamelinkBlogPostContent.edges
  const questions = data.allFlamelinkQuestionAnswerContent.edges
  const UsortedpostEdges = [...posts, ...questions]
  const postEdges = UsortedpostEdges.slice().sort(
    (a, b) => new Date(b.node.date) - new Date(a.node.date)
  )

  const classes = useStyles()
  const pageTitle = pageContext.category
  return (
    <TopLayout>
      <SEO pageTitle={`${pageTitle} Category`} />
      <Container>
        <MainParticles title={pageTitle} />
        <Grid container spacing={5} className={classes.mainGrid}>
          <Main postEdges={postEdges} title={pageTitle} />
          <Sidebar />
        </Grid>
      </Container>
    </TopLayout>
  )
}

export const pageQuery = graphql`
  query CategoryPage($category: String) {
    allFlamelinkBlogPostContent(
      limit: 2000
      filter: { category: { eq: $category } }
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
    allFlamelinkQuestionAnswerContent(
      limit: 2000
      filter: { category: { eq: $category } }
    ) {
      edges {
        node {
          question
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
  }
`
