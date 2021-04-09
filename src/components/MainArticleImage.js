import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import { graphql, useStaticQuery, Link } from 'gatsby'
import Img from 'gatsby-image'

const useStyles = makeStyles((theme) => ({
  mainArticleImage: {
    position: 'relative',
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    maxHeight: '500px',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainArticleImageContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}))

export default function MainArticleImage({ post }) {
  const classes = useStyles()
  const cover = post.coverImage[0].localFile.name
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
  const mainImage = image ? image.node.childImageSharp.fluid : null
  return (
    <Card className={classes.mainArticleImage}>
      <Img fluid={mainImage} />
    </Card>
  )
}

MainArticleImage.propTypes = {
  post: PropTypes.object,
}
