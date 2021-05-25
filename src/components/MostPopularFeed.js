import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import {
  Card,
  CardActionArea,
  Grid,
  Typography,
  Hidden,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: '15px',
  },
  postCard: {
    marginRight: '20px ',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '3px',
      marginRight: '0px',
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    backgroundColor: 'transparent',
    '&:nth-child(even)': {
      backgroundColor:
        '-internal-light-dark(rgb(239, 239, 239), rgb(59, 59, 59))',
    },
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: 500,
    '@media (min-width:600px)': {
      fontSize: '1.3rem',
    },
  },
  author: {
    fontFamily: 'Montserrat, sans-serif',
  },
  category: {
    fontWeight: 700,
    borderBottom: 'solid 2px ',
  },
  content: {
    padding: '2px',
  },
  popular: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
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
  imageButton: {
    height: '140px',
    margin: '0px',
    [theme.breakpoints.down('sm')]: {
      height: '120px',
    },
    marginBottom: '10px',
  },
}))

export default function MostPopularFeed({ postEdges }) {
  const classes = useStyles()

  return (
    <Grid className={classes.root}>
      <Typography
        color="secondary"
        className={classes.header}
        gutterBottom
        variant="h6"
      >
        Most Popular
      </Typography>
      <Grid className={classes.popular}>
        {postEdges.slice(0, 5).map((post, index) => {
          const title = post.node.title ? post.node.title : post.node.question
          return (
            <div
              key={index}
              data-sal="slide-up"
              data-sal-easing="ease"
              data-sal-duration="700"
            >
              <Card elevation={0} className={classes.postCard}>
                <CardActionArea>
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
                    <Typography className={classes.author} gutterBottom>
                      by {post.node.author}
                    </Typography>
                  </div>
                </CardActionArea>
              </Card>
            </div>
          )
        })}
      </Grid>
    </Grid>
  )
}
