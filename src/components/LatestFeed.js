import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import { Card, CardActionArea, Grid, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: '15px',
  },
  latest: {
    display: 'flex',
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  header: {
    fontFamily: 'Montserrat, sans-serif',
    backgroundColor: '#1489cc',
    padding: '0 5px 0 3px ',
    width: 'fit-content',
    borderRadius: '3%',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.4rem',
    },
  },
  postCard: {
    minWidth: '260px',
    [theme.breakpoints.down('sm')]: {
      minWidth: '240px',
      marginRight: '5px ',
    },
    marginRight: '20px ',
    backgroundColor: 'transparent',
  },
  category: {
    fontWeight: 700,
  },
  content: {
    padding: '2px',
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: 500,
    '@media (min-width:600px)': {
      fontSize: '1.3rem',
    },
  },
  continueReading: {
    color: '#1489cc',
    textDecoration: 'none',
  },
  imageButton: {
    height: '140px',
    margin: '0px',
    [theme.breakpoints.down('sm')]: {
      height: '120px',
    },
    marginBottom: '10px',
  },
}))

export default function LatestFeed({ postEdges }) {
  const classes = useStyles()

  return (
    <Grid className={classes.root}>
      <Typography
        color="secondary"
        className={classes.header}
        gutterBottom
        variant="h6"
      >
        Most Recent
      </Typography>
      <div className={classes.latest}>
        {postEdges.slice(0, 4).map((post, index) => {
          const title = post.node.title ? post.node.title : post.node.question
          return (
            <Card elevation={0} className={classes.postCard} key={index}>
              <CardActionArea>
                <div className={classes.imageButton}>
                  <Img
                    fluid={
                      post.node.coverImage[0].localFile.childImageSharp.fluid
                    }
                    style={{ height: '100%', width: '100%' }}
                    imgStyle={{ objectFit: 'fill' }}
                  />
                </div>
                <div className={classes.content}>
                  <Typography
                    color="primary"
                    className={classes.category}
                    variant="Subtitle1"
                  >
                    {post.node.category}
                  </Typography>
                  <Link
                    to={`/${post.node.slug}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <Typography
                      className={classes.title}
                      gutterBottom
                      variant="h6"
                      color="textPrimary"
                    >
                      {title}
                    </Typography>
                  </Link>
                  <Typography variant="body1" color="inherit" component="p">
                    {post.node.summary}
                  </Typography>
                </div>
              </CardActionArea>
            </Card>
          )
        })}
      </div>
    </Grid>
  )
}
