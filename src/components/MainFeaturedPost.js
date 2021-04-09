import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { graphql, useStaticQuery, Link } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: 'relative',
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'transparent',
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
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}))

export default function MainFeaturedPost(props) {
  const classes = useStyles()
  const { postEdges } = props
  const post = postEdges[postEdges.length - 2]
  const cover = post.node.coverImage[0].localFile.name
  const title = post.node.title ? post.node.title : post.node.question
  const data = useStaticQuery(graphql`
    query {
      allFile {
        edges {
          node {
            absolutePath
            name
            childImageSharp {
              fluid(maxHeight: 500) {
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
  const mainImage = image ? image.node.childImageSharp.fluid : null

  return (
    <BackgroundImage fluid={mainImage}>
      <div className={classes.overlay} />
      <Grid container>
        <Grid item md={6}>
          <div className={classes.mainFeaturedPostContent}>
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom
            >
              {title}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {post.node.summary}
            </Typography>
            <Link to={post.node.slug} className={classes.continueReading}>
              <Typography variant="subtitle1" color="primary">
                Continue reading...
              </Typography>
            </Link>
          </div>
        </Grid>
      </Grid>
    </BackgroundImage>
  )
}

MainFeaturedPost.propTypes = {
  post: PropTypes.object,
}
