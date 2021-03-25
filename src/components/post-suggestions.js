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
    float: 'right !important',
    marginLeft: 'auto',
    [theme.breakpoints.down('sm')]: {
      marginTop: '5px',
      marginLeft: 'auto',
    },
    [theme.breakpoints.up('md')]: {
      marginRight: 0,
    },
  },
}))
const PostSuggestions = ({ prevEdge, nextEdge }) => {
  const classes = useStyles()
  return (
    <div className={classes.postSuggestions}>
    {nextEdge && (
        <Link
          to={`${nextEdge.node.fields.slug}`}
          className={classes.nextButton}
        >
          <Button
            variant="outlined"
            color="primary"
            endIcon={<ArrowForwardIcon />}
          >
            {nextEdge.node.frontmatter.title}
          </Button>
        </Link>
      )}
      {prevEdge && (
        <Link to={`${prevEdge.node.fields.slug}`}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<ArrowBackIcon />}
          >
            {prevEdge.node.frontmatter.title}
          </Button>
        </Link>
      )}
      
    </div>
  )
}

export default PostSuggestions
