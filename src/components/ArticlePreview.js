import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Card, Hidden } from '@material-ui/core'
import { formatDistanceStrict } from 'date-fns'
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '160px',
    margin: '10px 0',
    boxShadow: 'none',
    alignItems: 'center',
    borderBottom: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.down('sm')]: {
      margin: '3px 0',
      height: '105px',
    },
    '&:hover': {
      boxShadow:
        '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
    },
  },
  imageButton: {
    minWidth: '230px',
    height: '160px',
    margin: '0px',
    [theme.breakpoints.down('sm')]: {
      minWidth: '120px',
      height: '105px',
    },
  },
  continueReading: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
      textDecorationColor: theme.palette.text.primary,
    },
  },
  details: {
    paddingLeft: '8px',
  },
  date: {
    letterSpacing: '1.3px',
    fontFamily: "'Roboto', sans-serif",
  },
  title: {
    fontFamily: "'Roboto', sans-serif",
    [theme.breakpoints.down('md')]: {
      fontSize: '15px',
    },
  },
  excerpt: {
    fontSize: '15px',
    fontFamily: "'Cardo', sans-serif",
  },
  author: {
    fontFamily: "'Roboto', sans-serif",
  },
  footer: {
    margin: '10px 0',
    padding: 0,
  },
}))

export default function ArticlePreview({ blog }) {
  const classes = useStyles()
  const startDate = new Date()
  const endDate = new Date(blog.node.date)
  const distanceInWords = formatDistanceStrict(endDate, startDate, {
    addSuffix: true,
  })

  return (
    <div data-sal="slide-up" data-sal-easing="ease" data-sal-duration="700">
      <Card className={classes.root}>
        <div className={classes.imageButton}>
          <Img
            fluid={blog.node.coverImage[0].localFile.childImageSharp.fluid}
            style={{ height: '100%', width: '100%' }}
            imgStyle={{ objectFit: 'fill' }}
          />
        </div>
        <div className={classes.details}>
          <Typography
            className={classes.date}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {distanceInWords}
          </Typography>
          <Link to={`/${blog.node.slug}`} style={{ textDecoration: 'none' }}>
            <Typography
              component="h4"
              color="textPrimary"
              className={classes.title}
            >
              {blog.node.title || blog.node.question}
            </Typography>
          </Link>
          <Typography
            className={classes.author}
            variant="body2"
            color="textSecondary"
            component="p"
            gutterBottom
          >
            {`By ${blog.node.author}`}
          </Typography>
          <Hidden mdDown>
            <Typography
              className={classes.excerpt}
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {blog.node.summary}
            </Typography>
            <Link
              className={classes.continueReading}
              to={`/${blog.node.slug}`}
              variant="subtitle1"
              color="textPrimary"
            >
              <Typography color="textPrimary" className={classes.title}>
                Continue reading...
              </Typography>
            </Link>
          </Hidden>
        </div>
      </Card>
    </div>
  )
}

ArticlePreview.propTypes = {
  post: PropTypes.object,
}
