import React from 'react'
import { Link } from 'gatsby'

import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'

import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'

const useStyles = makeStyles((theme) => ({
  postSuggestions: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  nextButton: {
    [theme.breakpoints.down('sm')]: {
      marginTop: '5px',
      marginLeft: 'auto',
    },
    [theme.breakpoints.up('md')]: {
      marginRight: 0,
    },
  },
}))
const PostSuggestions = ({ prevSlug, prevTitle, nextSlug, nextTitle }) => {
  const classes = useStyles()
  return (
    <div className={classes.postSuggestions}>
      <Link to={`/blog${prevSlug}`}>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<ArrowBackIcon />}
        >
          {prevTitle}
        </Button>
      </Link>
      <Link to={`/blog${nextSlug}`} className={classes.nextButton}>
        <Button
          variant="outlined"
          color="primary"
          endIcon={<ArrowForwardIcon />}
        >
          {nextTitle}
        </Button>
      </Link>
    </div>
  )
}

export default PostSuggestions
