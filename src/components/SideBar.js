import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { graphql, useStaticQuery } from 'gatsby'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import icon from '../images/icon.png'

import { Paper } from '@material-ui/core'
import PopularArticle from './PopularArticle'
import SubscriptionForm from './Subscribe'

const useStyles = makeStyles((theme) => ({
  sideGrid: {
    marginBottom: '10px',
  },
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.primary,
  },
  sidebarSection: {
    marginTop: theme.spacing(3),
  },
  roboFonts: {
    fontFamily: 'Roboto, sans-serif',
  },
}))

export default function Sidebar() {
  const classes = useStyles()
  const data = useStaticQuery(graphql`
    query {
      allFlamelinkBlogPostContent {
        edges {
          node {
            title
            author
            slug
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
            question
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
  `)
  const posts = data.allFlamelinkBlogPostContent.edges
  const questions = data.allFlamelinkQuestionAnswerContent.edges
  const Allviews = data.allPageViews.edges
  const UsortedpostEdges = [...posts, ...questions]
  const Viewedposts = UsortedpostEdges.map((post) => {
    const slugId = `/${post.node.slug}`
    const currentPageViews = Allviews.find(
      (filteredPageView) => filteredPageView.node.id === slugId
    )
    return {
      ...post,
      pageViews: currentPageViews ? currentPageViews.node.totalCount : 0,
    }
  })

  const postEdges = Viewedposts.sort((a, b) => b.pageViews - a.pageViews)
  return (
    <Grid item xs={12} md={4} className={classes.sideGrid}>
      <Paper elevation={1}>
        <Card elevation={0} className={classes.sidebarAboutBox}>
          <CardHeader
            avatar={
              <Avatar aria-label="hyblog" src={icon}>
                H
              </Avatar>
            }
            title={
              <Typography className={classes.roboFonts} variant="h4">
                Hyblog
              </Typography>
            }
          />
          <CardContent>
            <SubscriptionForm />
          </CardContent>
          <CardActions>
            <div>
              <Button
                size="small"
                className={classes.roboFonts}
                color="primary"
              >
                News
              </Button>
              <Button
                size="small"
                className={classes.roboFonts}
                color="primary"
              >
                Q & A
              </Button>
              <Button
                size="small"
                className={classes.roboFonts}
                color="primary"
              >
                Poetry
              </Button>
              <Button
                size="small"
                className={classes.roboFonts}
                color="primary"
              >
                Categories
              </Button>
            </div>
          </CardActions>
        </Card>
        <Card elevation={0} className={classes.sidebarAboutBox}>
          <Typography className={classes.roboFonts} variant="h6">
            Popular Articles
          </Typography>

          {postEdges.slice(0, 6).map((post, index) => {
            return <PopularArticle blog={post} key={index} />
          })}
        </Card>
      </Paper>
    </Grid>
  )
}
