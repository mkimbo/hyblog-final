import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import icon from '../images/icon.png'
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
    width: '100px',
    height: '80px',
    margin: '0px',
  },
  imageButton: {
    width: '100px',
    height: '80px',
    margin: '0px',
  },

  cardBody: {
    margin: '0px',
  },
  title: {
    fontFamily: "'Roboto', sans-serif",
  },
  author: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: 'smaller',
  },
}))

export default function PopularArticle({ blog }) {
  const classes = useStyles()

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
        <Link to={`/${blog.node.slug}`} style={{ textDecoration: 'none' }}>
          <Typography
            variant="body"
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
      </CardContent>
    </Card>
  )
}

PopularArticle.propTypes = {
  post: PropTypes.object,
}
