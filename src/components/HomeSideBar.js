import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Subscribe from '../components/Subscribe'

import { Paper, Typography, Card } from '@material-ui/core'
import PopularArticle from './PopularArticle'

const useStyles = makeStyles((theme) => ({
  homeSideBar: {
    marginBottom: '10px',
    backgroundColor: 'transparent',
  },
  editorsPick: {
    paddingTop: '10px',
    backgroundColor: 'transparent',
  },
  category: {
    fontFamily: 'Montserrat, sans-serif',
    borderLeft: '4px solid #1489cc',
    backgroundColor: '#1489cc',
  },
}))

function HomeSideBar({ postEdges }) {
  const classes = useStyles()
  return (
    <Paper elevation={0} className={classes.homeSideBar}>
      <Subscribe />
      <Card elevation={0} className={classes.editorsPick}>
        <Typography color="secondary" className={classes.category} variant="h6">
          Editor's Pick
        </Typography>
        {postEdges.slice(9, 13).map((post, index) => {
          return <PopularArticle blog={post} key={index} />
        })}
      </Card>
    </Paper>
  )
}

export default HomeSideBar
