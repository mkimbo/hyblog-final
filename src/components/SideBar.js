import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { graphql, useStaticQuery, Link } from 'gatsby'
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
  category: {
    fontFamily: 'Montserrat, sans-serif',
    borderLeft: '4px solid #1489cc',
    paddingLeft: '5px',
    backgroundColor: '#1489cc',
  },
  categoryLink: {
    padding: theme.spacing(1),
    fontFamily: 'Roboto, sans-serif',
    flexShrink: 0,
    color: '#1489cc',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  moreArticles: {
    float: 'right',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
      color: '#1489cc',
    },
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
            date
            author
            category
            slug
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
      allFlamelinkQuestionAnswerContent {
        edges {
          node {
            question
            slug
            date
            author
            category
            coverImage {
              localFile {
                name
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
  const categoryList = []
  data.allFlamelinkBlogPostContent.edges.map((post) => {
    categoryList.push(post.node.category)
    return null
  })
  const Total = [...posts, ...questions]
  const Politics = Total.filter(
    (edge) => edge.node.category === 'Politics'
  ).sort((a, b) => new Date(b.node.date) - new Date(a.node.date))
  const Society = Total.filter((edge) => edge.node.category === 'Society').sort(
    (a, b) => new Date(b.node.date) - new Date(a.node.date)
  )
  const Youth = Total.filter((edge) => edge.node.category === 'Youth').sort(
    (a, b) => new Date(b.node.date) - new Date(a.node.date)
  )
  const African = Total.filter(
    (edge) => edge.node.category === 'Africanacity'
  ).sort((a, b) => new Date(b.node.date) - new Date(a.node.date))
  const Viewedposts = Total.map((post) => {
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
          <Typography>
            {Array.from(new Set(categoryList))
              .slice(0, 4)
              .map((category) => (
                <Link
                  to={`/${category.replace(/\W+/g, '-').toLowerCase()}`}
                  key={category}
                  color="primary"
                  className={classes.categoryLink}
                >
                  {category}
                </Link>
              ))}
          </Typography>

          <Typography>
            <SubscriptionForm />
          </Typography>
        </Card>
        <Card elevation={0} className={classes.sidebarAboutBox}>
          <Typography
            color="secondary"
            className={classes.category}
            variant="h6"
          >
            What people read
          </Typography>

          {postEdges.slice(0, 5).map((post, index) => {
            return <PopularArticle blog={post} key={index} />
          })}
        </Card>
        <Card elevation={0} className={classes.sidebarAboutBox}>
          <Typography
            color="secondary"
            className={classes.category}
            variant="h6"
          >
            Society & Lifestyle
          </Typography>

          {Society.slice(0, 2).map((post, index) => {
            return <PopularArticle blog={post} key={index} />
          })}
          <Link to={`/society`} className={classes.moreArticles}>
            <Typography color="primary">more on society...</Typography>
          </Link>
        </Card>
        <Card elevation={0} className={classes.sidebarAboutBox}>
          <Typography
            color="secondary"
            className={classes.category}
            variant="h6"
          >
            Youth Check
          </Typography>

          {Youth.slice(0, 2).map((post, index) => {
            return <PopularArticle blog={post} key={index} />
          })}
          <Link to={`/youth`} className={classes.moreArticles}>
            <Typography color="primary">more on youth...</Typography>
          </Link>
        </Card>
        <Card elevation={0} className={classes.sidebarAboutBox}>
          <Typography
            color="secondary"
            className={classes.category}
            variant="h6"
          >
            African Affairs
          </Typography>

          {African.slice(0, 2).map((post, index) => {
            return <PopularArticle blog={post} key={index} />
          })}
          <Link to={`/africanacity`} className={classes.moreArticles}>
            <Typography color="primary">more african affairs...</Typography>
          </Link>
        </Card>
        <Card elevation={0} className={classes.sidebarAboutBox}>
          <Typography
            color="secondary"
            className={classes.category}
            variant="h6"
          >
            Political Fever Pitch
          </Typography>

          {Politics.slice(0, 2).map((post, index) => {
            return <PopularArticle blog={post} key={index} />
          })}
          <Link to={`/politics`} className={classes.moreArticles}>
            <Typography color="primary">more on politics...</Typography>
          </Link>
        </Card>
      </Paper>
    </Grid>
  )
}
