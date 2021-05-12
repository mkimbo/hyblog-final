import React from 'react'
import { graphql } from 'gatsby'
import { makeStyles } from '@material-ui/core/styles'

import TopLayout from '../components/TopLayout'
import { Container, Grid } from '@material-ui/core'

import AuthorParticles from '../components/AuthorParticles'
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
  const author = data.flamelinkAuthorsContent
  const UnsortedpostEdges = [...posts, ...questions]
  const postEdges = UnsortedpostEdges.slice().sort(
    (a, b) => new Date(b.node.date) - new Date(a.node.date)
  )

  const classes = useStyles()
  const pageTitle = pageContext.author
  return (
    <TopLayout>
      <SEO
        pageTitle={`${pageTitle}`}
        pageDescription={author?.tagline}
        pageSlug={`/${pageTitle?.replace(/\W+/g, '-').toLowerCase()}`}
      />
      <Container>
        <AuthorParticles author={author} />
        <Grid container spacing={5} className={classes.mainGrid}>
          <Main postEdges={postEdges} author={pageTitle} />
          <Sidebar />
        </Grid>
      </Container>
    </TopLayout>
  )
}

export const pageQuery = graphql`
  query AuthorPage($author: String) {
    allFlamelinkBlogPostContent(
      limit: 2000
      filter: { author: { eq: $author } }
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
              name
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
      filter: { author: { eq: $author } }
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
              name
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
    flamelinkAuthorsContent(name: { eq: $author }) {
      email
      facebook
      name
      tagline
      twitter
      avatar {
        localFile {
          name
        }
      }
    }
  }
`
