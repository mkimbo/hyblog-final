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
    },
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(1),
    backgroundColor: '#f2f5fa',
  },
  media: {
    width: '100%',
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
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}))

export default function MainFeaturedPost(props) {
  const classes = useStyles()
  const { postEdges } = props
  const post = postEdges[0]
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
        <Grid item>
          <Typography variant="h6" color="secondary" className={classes.editor}>
            Editor's pick
          </Typography>
          <div className={classes.mainFeaturedPostContent}>
            <Typography variant="h4" color="inherit" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h6" color="inherit" paragraph>
              {post.node.summary}
            </Typography>
            <Link to={post.node.slug} className={classes.continueReading}>
              <Typography variant="subtitle1" color="primary">
                Continue reading...
              </Typography>
            </Link>
          </div>
        </Grid>
        <Grid item>
          <Img fluid={mainImage} className={classes.media} />
        </Grid>
      </Grid>
    </Paper>
  )
}

MainFeaturedPost.propTypes = {
  post: PropTypes.object,
}
