import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'

const useStyles = makeStyles((theme) => ({
  mainArticleImage: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    height: '400px',
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
  const mainImage = post.coverImage[0].localFile
    ? post.coverImage[0].localFile.childImageSharp.fluid.srcWebp
    : 'https://source.unsplash.com/random'
  return (
    <Card
      className={classes.mainArticleImage}
      style={{ backgroundImage: `url(${mainImage})` }}
    ></Card>
  )
}

MainArticleImage.propTypes = {
  post: PropTypes.object,
}
