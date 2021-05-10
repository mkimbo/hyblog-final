import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { graphql, useStaticQuery, Link } from 'gatsby'
import Img from 'gatsby-image'

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    [theme.breakpoints.down('sm')]: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      height: 'fit-content',
    },
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(1),
    backgroundColor: '#303030',
    height: '400px',
  },
  media: {
    height: '400px',
    [theme.breakpoints.down('sm')]: {
      height: '300px',
    },
  },
  details: {
    height: '400px',
    [theme.breakpoints.down('sm')]: {
      height: '350px',
    },
  },

  editor: {
    position: 'relative',
    top: 0,
    left: '2px',
    backgroundColor: '#1489cc',
    width: 'fit-content',
    padding: '0 2px',
    [theme.breakpoints.down('sm')]: {
      top: '2px',
      left: 0,
    },
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
  continueReading: {
    color: '#1489cc',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  title: {
    [theme.breakpoints.up('md')]: {
      fontSize: '30px',
    },
  },
  text: {
    [theme.breakpoints.up('md')]: {
      fontSize: '18px',
    },
  },
}))

export default function MainFeaturedPost(props) {
  const classes = useStyles()
  const { post } = props
  const cover = post.node.coverImage[0].localFile
    ? post.node.coverImage[0].localFile.name
    : null
  const title = post.node.title ? post.node.title : post.node.question
  const data = useStaticQuery(graphql`
    query {
      allFile {
        edges {
          node {
            absolutePath
            name
            childImageSharp {
              fluid(maxHeight: 400) {
                ...GatsbyImageSharpFluid_tracedSVG
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
    <Paper elevation={1}>
      <Grid container className={classes.mainFeaturedPost}>
        <div className={classes.details}>
          <Typography variant="h6" color="secondary" className={classes.editor}>
            Trending
          </Typography>
          <div className={classes.mainFeaturedPostContent}>
            <Typography
              color="secondary"
              variant="h5"
              className={classes.title}
            >
              {title}
            </Typography>
            <Typography
              color="secondary"
              variant="subtitle1"
              className={classes.text}
              paragraph
            >
              {post.node.summary}
            </Typography>
            <Link to={post.node.slug} className={classes.continueReading}>
              <Typography variant="subtitle1" color="primary">
                Continue reading...
              </Typography>
            </Link>
          </div>
        </div>
        <div className={classes.media}>
          <Img
            fluid={mainImage}
            style={{ height: '100%', width: '100%' }}
            imgStyle={{ objectFit: 'fill' }}
          />
        </div>
      </Grid>
    </Paper>
  )
}

MainFeaturedPost.propTypes = {
  post: PropTypes.object,
}
