import React from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import { graphql, useStaticQuery, Link } from 'gatsby'
import { notify } from 'react-notify-toast'
import { FaFacebookF, FaTwitter } from 'react-icons/fa'
import {
  Paper,
  Chip,
  ListItem,
  List,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Avatar,
  IconButton,
  Typography,
  Card,
  Grid,
  Tooltip,
} from '@material-ui/core'

import LatestInCategory from './LatestInCategory'
import PopularArticle from './PopularArticle'
import icon from '../images/Hycon.png'

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
  pages: {
    display: 'flex',

    flexWrap: 'wrap',
  },
  category: {
    fontFamily: 'Montserrat, sans-serif',
    borderLeft: '4px solid #1489cc',
    paddingLeft: '5px',
    backgroundColor: '#1489cc',
  },

  categoryLink: {
    padding: '3px',
    fontFamily: 'Roboto, sans-serif',
    flexShrink: 0,
    color: '#1489cc',
    textDecoration: 'none',
  },
  categoryChip: {
    fontFamily: 'Roboto, sans-serif',
    cursor: 'pointer',
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

const AutoTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.type === 'dark' ? '#fff' : '#303030',
    color: theme.palette.type === 'dark' ? '#303030' : '#fff',
    boxShadow: theme.shadows[1],
    fontSize: 11,
    fontWeight: 'bold',
  },
}))(Tooltip)
export default function Sidebar(theme) {
  const classes = useStyles()
  let myColor = {
    background: '#ffffff',
    text: '#1489cc',
  }
  const notifyNews = () => {
    notify.show('News Section Coming Soon', 'custom', 5000, myColor)
  }
  const notifyPoetry = () => {
    notify.show('Photo Poetry Coming Soon', 'custom', 5000, myColor)
  }

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
  `)
  const posts = data.allFlamelinkBlogPostContent.edges
  const questions = data.allFlamelinkQuestionAnswerContent.edges
  const Allviews = data.allPageViews.edges
  const categoryList = []
  data.allFlamelinkBlogPostContent.edges.map((post) => {
    categoryList.push(post.node.category)
    return null
  })
  data.allFlamelinkQuestionAnswerContent.edges.map((post) => {
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
  const Covid = Total.filter((edge) => edge.node.category === 'COVID').sort(
    (a, b) => new Date(b.node.date) - new Date(a.node.date)
  )
  const Youth = Total.filter((edge) => edge.node.category === 'Youth').sort(
    (a, b) => new Date(b.node.date) - new Date(a.node.date)
  )
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
          <div>
            <List dense>
              <ListItem>
                <ListItemAvatar>
                  <Avatar aria-label="hyblog" alt="hyblog" src={icon}>
                    H
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography className={classes.roboFonts} variant="h5">
                      Hyblog
                    </Typography>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton
                    href="https://facebook.com/Hyreads"
                    color="inherit"
                    alt="Hyblog facebook account"
                  >
                    <FaFacebookF />
                  </IconButton>
                  <IconButton
                    href="https://twitter.com/hyreads"
                    color="inherit"
                    alt="Hyblog twitter account"
                  >
                    <FaTwitter />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </div>
          <div className={classes.pages}>
            <Link
              to={`/qa`}
              color="primary"
              className={classes.categoryLink}
              alt="question and answer"
            >
              <AutoTooltip
                title="Do you have any question you would like answered in detail as an article? Let's Engage through the Grand Philosopher Question & Answer"
                arrow
                placement="top"
              >
                <Chip
                  className={classes.categoryChip}
                  color="primary"
                  label="Q & A"
                  variant="outlined"
                />
              </AutoTooltip>
            </Link>
            {Array.from(new Set(categoryList)).map((category) => (
              <Link
                to={`/${category.replace(/\W+/g, '-').toLowerCase()}`}
                key={category}
                color="primary"
                className={classes.categoryLink}
                alt={category}
              >
                <AutoTooltip
                  title={`${category} Category`}
                  arrow
                  placement="top"
                >
                  <Chip
                    color="primary"
                    label={category}
                    className={classes.categoryChip}
                    variant="outlined"
                  />
                </AutoTooltip>
              </Link>
            ))}
            <Link
              to={`#`}
              color="primary"
              className={classes.categoryLink}
              alt="hyblog news"
            >
              <AutoTooltip title="The Hyblog Newsflash" arrow placement="top">
                <Chip
                  className={classes.categoryChip}
                  onClick={notifyNews}
                  color="primary"
                  label="News"
                  variant="outlined"
                />
              </AutoTooltip>
            </Link>
            <Link
              to={`#`}
              color="primary"
              className={classes.categoryLink}
              alt="photo poetry"
            >
              <AutoTooltip title="Poetry in Picture" arrow placement="top">
                <Chip
                  className={classes.categoryChip}
                  onClick={notifyPoetry}
                  color="primary"
                  label="Photo Poetry"
                  variant="outlined"
                />
              </AutoTooltip>
            </Link>
          </div>
        </Card>
        <Card elevation={0} className={classes.sidebarAboutBox}>
          <Typography
            color="secondary"
            className={classes.category}
            variant="h6"
          >
            Most Popular
          </Typography>

          {postEdges.slice(0, 7).map((post, index) => {
            return <PopularArticle blog={post} key={index} />
          })}
        </Card>
        <Card elevation={0} className={classes.sidebarAboutBox}>
          <Typography
            color="secondary"
            className={classes.category}
            variant="h6"
          >
            Covid 19 - Stay Safe
          </Typography>

          {Covid.slice(0, 2).map((post, index) => {
            return <LatestInCategory blog={post} key={index} />
          })}
          <Link to={`/covid`} className={classes.moreArticles}>
            <Typography color="primary">more on the pandemic...</Typography>
          </Link>
        </Card>
        <Card elevation={0} className={classes.sidebarAboutBox}>
          <Typography
            color="secondary"
            className={classes.category}
            variant="h6"
          >
            Society Section
          </Typography>

          {Society.slice(0, 2).map((post, index) => {
            return <LatestInCategory blog={post} key={index} />
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
            return <LatestInCategory blog={post} key={index} />
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
            Political Fever Pitch
          </Typography>

          {Politics.slice(0, 2).map((post, index) => {
            return <LatestInCategory blog={post} key={index} />
          })}
          <Link to={`/politics`} className={classes.moreArticles}>
            <Typography color="primary">more on politics...</Typography>
          </Link>
        </Card>
      </Paper>
    </Grid>
  )
}
