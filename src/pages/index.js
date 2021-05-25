import React from 'react'
import { graphql } from 'gatsby'
import Notifications from 'react-notify-toast'
import { Container, Grid, Hidden } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import SEO from '../components/SEO/SEO'
import LatestFeed from '../components/LatestFeed'
import Hero from '../components/Hero/Hero'
import TopLayout from '../components/TopLayout'
import Feed2 from '../components/Feed2'
import Feed3 from '../components/Feed3'
import HomeSideBar from '../components/HomeSideBar'

const useStyles = makeStyles((theme) => ({
  sideGrid: {
    [theme.breakpoints.down('sm')]: {
      order: 3,
    },
  },
}))
export default function Index({ data }) {
  const classes = useStyles()
  const posts = data.allFlamelinkBlogPostContent.edges
  const questions = data.allFlamelinkQuestionAnswerContent.edges
  const Allviews = data.allPageViews.edges
  const UnsortedpostEdges = [...posts, ...questions]
  const postEdges = UnsortedpostEdges.slice().sort(
    (a, b) => new Date(b.node.date) - new Date(a.node.date)
  )

  const Viewedposts = postEdges.map((post) => {
    const slugId = `/${post.node.slug}`
    const currentPageViews = Allviews.find(
      (filteredPageView) => filteredPageView.node.id === slugId
    )
    return {
      ...post,
      pageViews: currentPageViews ? currentPageViews.node.totalCount : 0,
    }
  })

  const mostViewed = Viewedposts.sort((a, b) => b.pageViews - a.pageViews)
  return (
    <TopLayout>
      <SEO
        pageSlug=""
        pageDescription={`Creating impactful conversations on real issues by Educating Enlightening and Empowering one another for the betterment of society.`}
      />
      <Container>
        <Notifications />
        <Hero postEdges={mostViewed} />
        <LatestFeed postEdges={postEdges} />
        <Grid container>
          <Grid item xs={12} md={7} className={classes.sideGrid}>
            <Feed2 postEdges={mostViewed} />
            <Feed3 postEdges={mostViewed} />
          </Grid>
          <Hidden smDown>
            <Grid item xs={12} md={1}></Grid>
          </Hidden>
          <Grid item xs={12} md={4}>
            <HomeSideBar postEdges={mostViewed} />
          </Grid>
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
              name
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
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
          tags
          coverImage {
            localFile {
              name
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    allPageViews {
      edges {
        node {
          totalCount
          id
        }
      }
    }
  }
`
