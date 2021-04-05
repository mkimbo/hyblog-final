import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Pagination from '@material-ui/lab/Pagination'
import ArticlePreview from './ArticlePreview'

const useStyles = makeStyles((theme) => ({
  pagination: {
    padding: '30px 0',
    '& > nav > ul': {
      justifyContent: 'center',
    },
  },
}))

export default function Main({ postEdges, title }) {
  const classes = useStyles()
  const [pageNumber, setPageNumber] = useState(1)
  const onPageChange = (event, page) => {
    setPageNumber(page)
    executeScroll()
  }
  const myRef = useRef(null)
  const executeScroll = () => myRef.current.scrollIntoView()
  // for pagination
  let totalPages = Math.ceil(postEdges.length / 5)
  let LastPostIndex = pageNumber * 5
  let FirstPostIndex = LastPostIndex - 5
  const Posts = postEdges.slice(FirstPostIndex, LastPostIndex)
  return (
    <Grid item xs={12} md={8}>
      <Typography variant="h6" gutterBottom ref={myRef}>
        {`Latest on ${title}`}
        <span>{pageNumber === 1 ? '' : ` page ${pageNumber}`}</span>
      </Typography>
      <Divider />
      {Posts.map((post, index) => {
        return <ArticlePreview blog={post} key={index} />
      })}
      <div className={classes.pagination}>
        {totalPages > 1 ? (
          <Pagination
            count={totalPages}
            page={pageNumber}
            onChange={onPageChange}
            color="primary"
          />
        ) : (
          <Pagination
            count={1}
            page={pageNumber}
            onChange={onPageChange}
            color="primary"
          />
        )}
      </div>
    </Grid>
  )
}

Main.propTypes = {
  posts: PropTypes.array,
  title: PropTypes.string,
}
