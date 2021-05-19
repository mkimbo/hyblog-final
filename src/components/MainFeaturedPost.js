import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Grid, Paper, Button } from '@material-ui/core'
import { graphql, useStaticQuery, Link } from 'gatsby'
import Img from 'gatsby-image'
import { motion } from 'framer-motion'

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: 'relative',
    height: '450px',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      minHeight: '63vh',
    },
    boxShadow:
      '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  title: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '30px',
    },
  },
  continueReading: {
    color: '#1489cc',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
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
    <Paper elevation={2} className={classes.mainFeaturedPost}>
      <Img
        fluid={mainImage}
        style={{ height: '100%', width: '100%' }}
        imgStyle={{ objectFit: 'fill' }}
      />
      <div className={classes.overlay}>
        <Grid container>
          <Grid item md={7}>
            <div className={classes.mainFeaturedPostContent}>
              <motion.div
                initial={{
                  y: -200,
                }}
                animate={{
                  y: 0,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 70,
                }}
              >
                <Typography
                  variant="h3"
                  color="inherit"
                  gutterBottom
                  className={classes.title}
                >
                  {title}
                </Typography>
              </motion.div>

              <motion.div
                initial={{
                  y: -10,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                transition={{
                  delay: 0.3,
                  duration: 0.7,
                }}
              >
                <Typography variant="h6" color="inherit" paragraph>
                  {post.node.summary}
                </Typography>
              </motion.div>
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: 0.8,
                  duration: 0.8,
                }}
              >
                <Link to={post.node.slug} className={classes.continueReading}>
                  <Button variant="contained" color="primary">
                    Read More
                  </Button>
                </Link>
              </motion.div>
            </div>
          </Grid>
        </Grid>
      </div>
    </Paper>
  )
}

MainFeaturedPost.propTypes = {
  post: PropTypes.object,
}
