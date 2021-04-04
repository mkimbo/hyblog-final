import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Hidden from '@material-ui/core/Hidden'
import icon from '../images/icon.png'
import { formatDistanceStrict } from 'date-fns'
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin: '20px 0',
    boxShadow: 'none',
    alignItems: 'center',
    borderBottom: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.down('xs')]: {
      margin: '3px 0',
    },
  },
  media: {
    width: '220px',
    height: '170px',
    [theme.breakpoints.down('xs')]: {
      width: '100px',
      height: '80px',
      margin: '0px',
    },
  },
  imageButton: {
    width: '220px',
    height: '170px',
    margin: '0 30px',
    [theme.breakpoints.down('xs')]: {
      width: '100px',
      height: '80px',
      margin: '0px 3px',
    },
  },
  continueReading: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  cardBody: {
    [theme.breakpoints.down('xs')]: {
      margin: '10px 5px',
    },
  },
  date: {
    letterSpacing: '1.3px',
    fontFamily: "'Roboto', sans-serif",
  },
  title: {
    fontFamily: "'Roboto', sans-serif",
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
    unit: 'year',
    unit: 'month',
    unit: 'day',
  })

  return (
    <Card className={classes.root}>
      <div className={classes.imageButton}>
        <CardMedia
          className={classes.media}
          image={
            blog.node.coverImage[0].localFile
              ? blog.node.coverImage[0].localFile.childImageSharp.fluid.srcWebp
              : icon
          }
          title={blog.node.title}
        />
      </div>

      <CardContent className={classes.cardBody}>
        <Typography
          className={classes.date}
          variant="body2"
          color="textSecondary"
          component="p"
        >
          {blog.node.category}
        </Typography>
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
            variant="body"
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
        <Hidden xsDown>
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
            <Typography
              variant="body"
              color="textPrimary"
              className={classes.title}
            >
              Continue reading...
            </Typography>
          </Link>
        </Hidden>
      </CardContent>
    </Card>
  )
}

ArticlePreview.propTypes = {
  post: PropTypes.object,
}
