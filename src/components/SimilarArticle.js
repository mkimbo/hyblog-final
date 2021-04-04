import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import icon from '../images/icon.png'
import LocalOfferIcon from '@material-ui/icons/LocalOffer'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin: '5px 0',
    boxShadow: 'none',
    minHeight: '100px',
    borderBottom: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.down('xs')]: {
      margin: '3px 0',
    },
  },
  tags: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'left',
    alignContent: 'center',
    alignItems: 'center',
    margin: '1px 0',
  },
  media: {
    width: '100px',
    height: '100%',
    margin: '0px',
  },
  imageButton: {
    width: '100px',
    height: '100%',
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

export default function SimilarArticle({ blog }) {
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
        <div className={classes.tags}>
          {blog.node.tags.map((tag, index) => {
            return (
              <Button
                key={index}
                variant="text"
                color="inherit"
                size="small"
                startIcon={<LocalOfferIcon color="primary" />}
              >
                {tag}
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

SimilarArticle.propTypes = {
  post: PropTypes.object,
}
