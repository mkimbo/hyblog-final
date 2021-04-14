import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Hidden from '@material-ui/core/Hidden'
import { formatDistanceStrict } from 'date-fns'
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin: '10px 0',
    boxShadow: 'none',
    alignItems: 'center',
    borderBottom: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.down('xs')]: {
      margin: '3px 0',
    },
    '&:hover': {
      boxShadow:
        '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
    },
  },
  media: {
    width: '220px',
    [theme.breakpoints.down('xs')]: {
      width: '100px',

      margin: '0px',
    },
  },
  imageButton: {
    width: '220px',
    height: '170px',
    margin: '0 5px',
    [theme.breakpoints.down('xs')]: {
      width: '100px',
      height: '100px',
      margin: '5px 1px',
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
      margin: '5px 0px',
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
  const cover = blog.node.coverImage[0].localFile.name
  const endDate = new Date(blog.node.date)
  const distanceInWords = formatDistanceStrict(endDate, startDate, {
    addSuffix: true,
    unit: 'day',
  })
  const data = useStaticQuery(graphql`
    query {
      allFile {
        edges {
          node {
            absolutePath
            childImageSharp {
              fluid(maxWidth: 800, maxHeight: 500) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `)
  const image = data.allFile.edges.find((n) =>
    n.node.absolutePath.includes(cover)
  )
  const mainImage = image.node.childImageSharp
    ? image.node.childImageSharp.fluid
    : null
  return (
    <div data-sal="slide-up" data-sal-easing="ease" data-sal-duration="700">
      <Card className={classes.root}>
        <div className={classes.imageButton}>
          <Img fluid={mainImage} className={classes.media} />
        </div>

        <CardContent className={classes.cardBody}>
          <Hidden xsDown>
            <Typography
              className={classes.date}
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {blog.node.category}
            </Typography>
          </Hidden>
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
    </div>
  )
}

ArticlePreview.propTypes = {
  post: PropTypes.object,
}
