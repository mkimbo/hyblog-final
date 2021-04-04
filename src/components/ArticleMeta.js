import React from 'react'
import { Grid, Typography, Button } from '@material-ui/core'
import ShareLinks from './ShareLinks'
import { format } from 'date-fns'
import { makeStyles } from '@material-ui/core/styles'
import LocalOfferIcon from '@material-ui/icons/LocalOffer'

const useStyles = makeStyles((theme) => ({
  tags: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'left',
    alignContent: 'center',
    alignItems: 'center',
    margin: '2px 0',
  },
}))
function ArticleMeta({ pageViews, postNode }) {
  const classes = useStyles()
  const timeToRead = postNode.articleText.fields.readingTime.text
  const date = new Date(postNode.date)
  const datePublished = format(date, 'MMMM dd, yyyy')
  return (
    <Grid item align="left">
      <Typography>{timeToRead}</Typography>
      <div className={classes.tags}>
        {postNode.tags.map((tag, index) => {
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
      <Typography>{`Published on ${datePublished}`}</Typography>
      <Typography gutterBottom>{`by ${postNode.author}`}</Typography>

      <em style={{ fontSize: 'smaller', fontFamily: 'Cardo, sans-serif' }}>
        {`(viewed ${pageViews} times)`}
      </em>
      <ShareLinks postNode={postNode} />
    </Grid>
  )
}

export default ArticleMeta
