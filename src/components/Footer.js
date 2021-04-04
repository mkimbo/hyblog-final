import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link as InternalLink } from 'gatsby'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import DarkModeButton from './DarkModeButton'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { FaFacebookF, FaTwitter } from 'react-icons/fa'
import { IconButton } from '@material-ui/core'

function Copyright() {
  return (
    <React.Fragment>
      <InternalLink
        to={`/`}
        style={{ fontFamily: 'Roboto, sans-serif', textDecoration: 'none' }}
      >
        <Typography
          color="primary"
          style={{ fontFamily: 'Roboto, sans-serif', textDecoration: 'none' }}
        >
          {'© '}HyBlog {new Date().getFullYear()}
        </Typography>
      </InternalLink>
      {' Official Blog From Hybra'}
    </React.Fragment>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.background.paper,
    fontFamily: 'Roboto, sans-serif',
  },
  container: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
  },
  iconsWrapper: {
    height: 120,
  },
  icons: {
    display: 'flex',
  },
  icon: {
    width: 40,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing(1),
    '&:hover': {
      backgroundColor: theme.palette.info.dark,
    },
  },
  list: {
    margin: 0,
    listStyle: 'none',
    padding: 0,
    fontFamily: 'Roboto, sans-serif',
    textDecoration: 'none',
  },
  listItem: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    fontFamily: 'Roboto, sans-serif',
  },
  roboFonts: {
    fontFamily: 'Roboto, sans-serif',
    textDecoration: 'none',
  },
  cardoFonts: {
    fontFamily: 'Cardo, sans-serif',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}))

export default function Footer() {
  const classes = useStyles()

  return (
    <Paper elevation={3} component="footer" className={classes.root}>
      <Container className={classes.container}>
        <Grid container spacing={5}>
          <Grid item xs={6} sm={4} md={2}>
            <Typography
              variant="h6"
              marked="left"
              gutterBottom
              className={classes.roboFonts}
            >
              Hyblog
            </Typography>
            <ul className={classes.list}>
              <li className={classes.listItem}>
                <InternalLink
                  color="primary"
                  to={`#`}
                  className={classes.cardoFonts}
                >
                  <Typography color="primary" className={classes.cardoFonts}>
                    Authors
                  </Typography>
                </InternalLink>
              </li>
              <li className={classes.listItem}>
                <InternalLink
                  color="primary"
                  to={`#emailSubscribe`}
                  className={classes.cardoFonts}
                >
                  <Typography color="primary" className={classes.cardoFonts}>
                    Subscribe
                  </Typography>
                </InternalLink>
              </li>
            </ul>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Typography
              variant="h6"
              marked="left"
              gutterBottom
              className={classes.roboFonts}
            >
              About
            </Typography>
            <ul className={classes.list}>
              <li className={classes.listItem}>
                <Link href="#" className={classes.cardoFonts}>
                  Hyblog
                </Link>
              </li>
              <li className={classes.listItem}>
                <Link href="https://hyreads.com" className={classes.cardoFonts}>
                  Hybra
                </Link>
              </li>
              <li className={classes.listItem}>
                <Link href="https://hyreads.com" className={classes.cardoFonts}>
                  Hyreads
                </Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Typography
              variant="h6"
              marked="left"
              gutterBottom
              className={classes.roboFonts}
            >
              Pages
            </Typography>
            <ul className={classes.list}>
              <li className={classes.listItem}>
                <InternalLink
                  color="primary"
                  to={`#`}
                  className={classes.cardoFonts}
                >
                  <Typography color="primary" className={classes.cardoFonts}>
                    News
                  </Typography>
                </InternalLink>
              </li>
              <li className={classes.listItem}>
                <InternalLink
                  color="primary"
                  to={`#`}
                  className={classes.cardoFonts}
                >
                  <Typography color="primary" className={classes.cardoFonts}>
                    Q & A
                  </Typography>
                </InternalLink>
              </li>
              <li className={classes.listItem}>
                <InternalLink
                  color="primary"
                  to={`#`}
                  className={classes.cardoFonts}
                >
                  <Typography color="primary" className={classes.cardoFonts}>
                    Photo Poetry
                  </Typography>
                </InternalLink>
              </li>
            </ul>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Typography
              variant="h6"
              marked="left"
              gutterBottom
              className={classes.roboFonts}
            >
              Dark
            </Typography>
            <DarkModeButton />
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <Grid
              container
              direction="column"
              justify="flex-end"
              className={classes.iconsWrapper}
              spacing={2}
            >
              <Grid item className={classes.icons}>
                <IconButton
                  href="https://facebook.com/Hyreads"
                  className={classes.icon}
                  color="inherit"
                >
                  <FaFacebookF />
                </IconButton>
                <IconButton
                  href="https://twitter.com/hyreads"
                  className={classes.icon}
                  color="inherit"
                >
                  <FaTwitter />
                </IconButton>
              </Grid>
              <Grid item>
                <Copyright />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  )
}
