import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin: '5px 0',
    boxShadow: 'none',
    height: '100px',
    alignItems: 'center',
    borderBottom: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.down('xs')]: {
      margin: '3px 0',
    },
  },

  imageButton: {
    minWidth: '110px',
    height: '100px',
  },

  details: {
    paddingLeft: '6px',
  },
  title: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: '15px',
  },
  author: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: 'smaller',
  },
}))

export default function SimilarArticle({ blog }) {
  const cover = blog.node.coverImage[0].localFile.name
  const classes = useStyles()
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
    <Card className={classes.root}>
      <div className={classes.imageButton}>
        <Img
          fluid={mainImage}
          style={{ height: '100%', width: '100%' }}
          imgStyle={{ objectFit: 'fill' }}
        />
      </div>

      <div className={classes.details}>
        <Link to={`/${blog.node.slug}`} style={{ textDecoration: 'none' }}>
          <Typography
            component="h5"
            color="textPrimary"
            className={classes.title}
          >
            {blog.node.title || blog.node.question}
          </Typography>
        </Link>
        <Typography
          className={classes.author}
          component="h6"
          color="textSecondary"
        >
          {`By ${blog.node.author}`}
        </Typography>
      </div>
    </Card>
  )
}

SimilarArticle.propTypes = {
  post: PropTypes.object,
}
