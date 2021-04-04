import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
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
  const post = postEdges[14]
  const mainImage = post.node.coverImage[0].localFile
    ? post.node.coverImage[0].localFile.childImageSharp.fluid.srcWebp
    : 'https://source.unsplash.com/random'

  return (
    <Paper
      className={classes.mainFeaturedPost}
      style={{
        backgroundImage: `url(${mainImage})`,
      }}
    >
      {/* const mainImage = post.node.coverImage[0].localFile
    ? post.node.coverImage[0].localFile.childImageSharp.fluid.srcWebp
    : "https://source.unsplash.com/random"; 
     {
        <Img
          fluid={
            post.node.coverImage[0].localFile.childImageSharp.fluid.srcWebp
          }
          alt={post.node.title}
        />
      }*/}
      {
        <Img
          fluid={
            post.node.coverImage[0].localFile.childImageSharp.fluid.srcWebp
          }
          alt={post.node.title}
        />
      }

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
              {post.node.title}
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
    </Paper>
  )
}

MainFeaturedPost.propTypes = {
  post: PropTypes.object,
}
