import React from 'react'
import { Grid, Typography, Button } from '@material-ui/core'
import ShareLinks from './ShareLinks'
import { format } from 'date-fns'
import { Link } from 'gatsby'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  category: {
    textDecoration: 'none',
  },
  author: {
    textDecoration: 'underline',
    color: '#1489cc',
  },
}))
function ArticleMeta({ pageViews, postNode }) {
  const classes = useStyles()
  const timeToRead = postNode.articleText.fields.readingTime.text
  const date = new Date(postNode.date)
  const datePublished = format(date, 'MMMM dd, yyyy')
  return (
    <Grid item align="left">
      <Link
        to={`/${postNode.category.replace(/\W+/g, '-').toLowerCase()}`}
        className={classes.category}
      >
        <Button variant="contained" size="small" color="primary">
          {postNode.category}
        </Button>
      </Link>
      <Typography>{timeToRead}</Typography>
      <Typography>{`Published on ${datePublished}`}</Typography>

      <Typography gutterBottom>
        by{' '}
        <Link
          to={`/${postNode.author.replace(/\W+/g, '-').toLowerCase()}`}
          className={classes.author}
        >
          {postNode.author}
        </Link>
      </Typography>

      {/** <em style={{ fontFamily: 'Cardo, sans-serif' }}>
        {`(viewed ${pageViews} times)`}
      </em>*/}
      <ShareLinks postNode={postNode} />
    </Grid>
  )
}

export default ArticleMeta
