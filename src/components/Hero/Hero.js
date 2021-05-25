import React from 'react'
import { Link } from 'gatsby'
import { Grid, Paper, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { motion } from 'framer-motion'
import loadable from '@loadable/component'
import LocalOfferIcon from '@material-ui/icons/LocalOffer'
import MainFeaturedPost from '../MainFeaturedPost.js'

const useStyles = makeStyles((theme) => ({
  hero: {
    display: 'grid',
    backgroundColor: 'transparent',
    marginBottom: '15px',
  },
  intro2: {
    display: 'grid',
    gridTemplateColumns: '5fr 7fr',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },
  intro: {
    textAlign: 'center',
    minHeight: '25vh',
    width: 'calc(100% - 2rem)',
    float: 'left',
    marginLeft: '1rem',
    paddingTop: '3rem',
    paddingBottom: '3rem',
    [theme.breakpoints.down('sm')]: {
      paddingBottom: '10px',
    },
  },
  title: {
    fontSize: '1.4rem',
    '@media (min-width:600px)': {
      fontSize: '1.5rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '2.5rem',
    },
    fontWeight: 700,
    fontFamily: 'Roboto, sans-serif',
  },
  tags: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'left',
    alignContent: 'center',
    alignItems: 'center',
    margin: '2px 0',
  },
  svg: {
    padding: '5px',
    width: '100%',
    height: '430px',
  },
  featured: {
    [theme.breakpoints.up('md')]: {},
    height: 'fit-content',
  },
  postTitle: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.4rem',
    },
  },
  weekly: {
    fontFamily: 'Montserrat, sans-serif',
    padding: '0 5px 0 3px ',
    backgroundColor: '#1489cc',
    width: 'fit-content',
    borderRadius: '3%',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.4rem',
    },
  },
  continueReading: {
    color: '#1489cc',
    textDecoration: 'none',
  },
  mainFeaturedPostContent: {
    padding: '3px',
    [theme.breakpoints.up('md')]: {
      padding: '8px',
      paddingRight: '10%',
    },
  },
}))

const Carousel = loadable(() => import('react-material-ui-carousel'))

function Hero({ postEdges }) {
  const classes = useStyles()
  const post = postEdges[7].node
  const title = post.title ? post.title : post.question
  return (
    <Paper elevation={0} className={classes.hero}>
      <Grid className={classes.intro}>
        <Typography variant="h1" className={classes.title}>
          Educate. Enlighten. Empower.
        </Typography>
        <Typography variant="subtitle1" paragraph>
          Impactful Conversations by Society for Society.
        </Typography>
      </Grid>

      <Grid className={classes.intro2}>
        <Grid className={classes.featured}>
          <div className={classes.mainFeaturedPostContent}>
            <Typography
              variant="h6"
              color="secondary"
              gutterBottom
              className={classes.weekly}
            >
              Featured Story
            </Typography>
            <div className={classes.tags}>
              {post.tags.map((tag, index) => {
                return (
                  <Button
                    key={index}
                    variant="text"
                    color="primary"
                    size="small"
                    startIcon={<LocalOfferIcon color="primary" />}
                  >
                    {tag}
                  </Button>
                )
              })}
            </div>
            <Typography
              variant="h5"
              color="inherit"
              gutterBottom
              className={classes.postTitle}
            >
              {title}
            </Typography>
            <Typography variant="subtitle1" color="inherit" paragraph>
              {post.summary}
            </Typography>
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.3,
                duration: 0.8,
              }}
            >
              <Link to={post.slug} className={classes.continueReading}>
                <Button variant="outlined" color="primary">
                  Read More
                </Button>
              </Link>
            </motion.div>
          </div>
        </Grid>
        <Grid className={classes.svg}>
          <Carousel indicators={false} interval={9000}>
            {postEdges.slice(3, 7).map((post, i) => (
              <MainFeaturedPost key={i} post={post} />
            ))}
          </Carousel>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Hero
