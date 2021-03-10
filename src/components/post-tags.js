import React from 'react'
import { Link } from 'gatsby'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  PostTags: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    margin: '7px',
  },
}))
const PostTags = ({ tags }) => {
  const classes = useStyles()
  return (
    <div className={classes.PostTags}>
      {tags &&
        tags.map((tag) => (
          <Link
            key={tag}
            to={`/tags/${tag.replace(/\W+/g, '-').toLowerCase()}`}
          >
            <Button size="small" color="primary">
              #{tag}
            </Button>
          </Link>
        ))}
    </div>
  )
}

export default PostTags
