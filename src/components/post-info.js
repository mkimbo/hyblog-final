import React from 'react'
import { Link } from 'gatsby'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles'
import CardHeader from '@material-ui/core/CardHeader'
import DateRangeIcon from '@material-ui/icons/DateRange'
import FolderIcon from '@material-ui/icons/Folder'

const useStyles = makeStyles((theme) => ({
  postInfo: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-between',
    marginBottom: '30px',
    marginTop: '10px',
  },
  avatar: {
    backgroundColor: 'red',
  },
}))
const PostInfo = ({ postNode }) => {
  const post = postNode.frontmatter
  const classes = useStyles()

  return (
    <div className={classes.postInfo}>
      <CardHeader
        avatar={<DateRangeIcon color="primary" fontSize="large" />}
        title={`Published on ${moment(postNode.fields.date).format(
          'MMM Do YYYY'
        )}`}
        subheader={`${postNode.timeToRead} min read`}
      />
      <CardHeader
        avatar={<FolderIcon color="primary" fontSize="large" />}
        title="In category"
        subheader={
          <Link
            to={`/categories/${post.category
              .replace(/\W+/g, '-')
              .toLowerCase()}`}
          >
            {post.category}
          </Link>
        }
      />
    </div>
  )
}

export default PostInfo
