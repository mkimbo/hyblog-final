import React from 'react'
import { graphql } from 'gatsby'
import { makeStyles } from '@material-ui/core/styles'

import TopLayout from '../components/TopLayout'
import { Container, Grid } from '@material-ui/core'

import MainArticleImage from '../components/MainArticleImage'
import SEO from '../components/SEO/SEO'
import MainArticleContent from '../components/MainArticleContent'
import Sidebar from '../components/SideBar'

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}))
export default function QATemplate({ data, pageContext }) {
  const classes = useStyles()
  const postNode = data.flamelinkQuestionAnswerContent
  const pageViews = data.pageViews.totalCount
  const pageTitle = postNode.question

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
        <MainArticleImage post={postNode} />
        <Grid container spacing={5} className={classes.mainGrid}>
          <MainArticleContent
            postNode={postNode}
            title={pageTitle}
            pageViews={pageViews}
          />
          <Sidebar />
        </Grid>
      </Container>
    </TopLayout>
  )
}

export const pageQuery = graphql`
  query QuestionAnswerBySlug($slug: String!, $viewer: String!) {
    flamelinkQuestionAnswerContent(slug: { eq: $slug }) {
      question
      questioner
      date
      category
      summary
      tags
      slug
      author
      coverImage {
        localFile {
          childImageSharp {
            fluid {
              srcWebp
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
