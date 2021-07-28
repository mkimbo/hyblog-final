import React from 'react'
import { graphql } from 'gatsby'
import { makeStyles } from '@material-ui/core/styles'

import TopLayout from '../components/TopLayout'
import { Container, Grid } from '@material-ui/core'

import QAParticles from '../components/QAParticles'
import SEO from '../components/SEO/SEO'
import Main from '../components/Main'
import Sidebar from '../components/SideBar'

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}))
export default function Category({ data, pageContext }) {
  const questions = data.allFlamelinkQuestionAnswerContent.edges
  const postEdges = questions
    .slice()
    .sort((a, b) => new Date(b.node.date) - new Date(a.node.date))

  const classes = useStyles()
  const pageTitle = 'Q & A Section'
  return (
    <TopLayout>
      <SEO
        pageSlug="qa"
        pageTitle={`Q & A`}
        pageDescription={`Engage with Grand Philosopher. Mail your questions to grand_philosopher@hyblog.info`}
      />
      <Container>
        <QAParticles />
        <Grid container spacing={5} className={classes.mainGrid}>
          <Main postEdges={postEdges} title={pageTitle} />
          <Sidebar />
        </Grid>
      </Container>
    </TopLayout>
  )
}

export const pageQuery = graphql`
  query QAPage {
    allFlamelinkQuestionAnswerContent(limit: 2000) {
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
  }
`
