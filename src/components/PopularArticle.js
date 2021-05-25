import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Card } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '80px',
    boxShadow: 'none',
    alignItems: 'center',
    borderBottom: `1px solid ${theme.palette.divider}`,
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

export default function PopularArticle({ blog }) {
  const classes = useStyles()

  return (
    <div>
      <Card className={classes.root}>
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
    </div>
  )
}

PopularArticle.propTypes = {
  post: PropTypes.object,
}
