import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Link as InternalLink } from 'gatsby'
import { notify } from 'react-notify-toast'
import {
  Switch,
  Paper,
  Grid,
  Link,
  Typography,
  Container,
  Tooltip,
} from '@material-ui/core'

import '../styles/footer.css'

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
const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch)
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    fontFamily: 'Roboto, sans-serif',
    width: '100%',
    marginTop: '10px',
  },
  container: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
    textAlign: 'center',
  },
  iconsWrapper: {},
  icons: {
    display: 'flex',
    lexDirection: 'row',
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

export default function Footer({ darkState, handleThemeChange }) {
  const classes = useStyles()
  let myColor = {
    background: '#ffffff',
    text: '#1489cc',
  }
  const notifyNews = () => {
    notify.show('News Section Coming Soon', 'custom', 5000, myColor)
  }
  const notifyPoetry = () => {
    notify.show('Photo Poetry Coming Soon', 'custom', 5000, myColor)
  }
  return (
    <div className="footer">
      <Paper elevation={3} component="footer" className={classes.root}>
        <Container className={classes.container}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4} md={3} align="left">
              <Typography
                variant="h6"
                marked="left"
                className={classes.roboFonts}
              >
                Hyblog
              </Typography>
              <Typography variant="subtitle1" color="secondary">
                Creating impactful conversations on real issues by Educating
                Enlightening and Empowering one another for the betterment of
                society.
              </Typography>

              <Copyright />
            </Grid>
            <Grid item xs={6} sm={4} md={2} align="left">
              <Typography
                variant="h6"
                marked="left"
                className={classes.roboFonts}
              >
                By Categories
              </Typography>
              <ul className={classes.list}>
                <li className={classes.listItem}>
                  <InternalLink
                    color="secondary"
                    to={`/society`}
                    className={classes.cardoFonts}
                  >
                    <Typography
                      color="secondary"
                      className={classes.cardoFonts}
                    >
                      Society
                    </Typography>
                  </InternalLink>
                </li>
                <li className={classes.listItem}>
                  <InternalLink
                    color="secondary"
                    to={`/covid-19`}
                    className={classes.cardoFonts}
                  >
                    <Typography
                      color="secondary"
                      className={classes.cardoFonts}
                    >
                      Covid 19
                    </Typography>
                  </InternalLink>
                </li>
                <li className={classes.listItem}>
                  <InternalLink
                    color="secondary"
                    to={`/youth`}
                    className={classes.cardoFonts}
                  >
                    <Typography
                      color="secondary"
                      className={classes.cardoFonts}
                    >
                      Youth
                    </Typography>
                  </InternalLink>
                </li>
                <li className={classes.listItem}>
                  <InternalLink
                    color="secondary"
                    to={`/education`}
                    className={classes.cardoFonts}
                  >
                    <Typography
                      color="secondary"
                      className={classes.cardoFonts}
                    >
                      Education
                    </Typography>
                  </InternalLink>
                </li>
                <li className={classes.listItem}>
                  <InternalLink
                    color="secondary"
                    to={`/politics`}
                    className={classes.cardoFonts}
                  >
                    <Typography
                      color="secondary"
                      className={classes.cardoFonts}
                    >
                      Politics
                    </Typography>
                  </InternalLink>
                </li>
                <li className={classes.listItem}>
                  <InternalLink
                    color="secondary"
                    to={`/africanacity`}
                    className={classes.cardoFonts}
                  >
                    <Typography
                      color="secondary"
                      className={classes.cardoFonts}
                    >
                      Africanacity
                    </Typography>
                  </InternalLink>
                </li>
              </ul>
            </Grid>
            <Grid item xs={6} sm={4} md={2} align="left">
              <Typography
                variant="h6"
                marked="left"
                className={classes.roboFonts}
              >
                By Content
              </Typography>
              <ul className={classes.list}>
                <li className={classes.listItem}>
                  <InternalLink
                    color="secondary"
                    to={`/qa`}
                    className={classes.cardoFonts}
                  >
                    <Typography
                      color="secondary"
                      className={classes.cardoFonts}
                    >
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
                    <Typography
                      color="secondary"
                      className={classes.cardoFonts}
                      onClick={notifyNews}
                    >
                      News
                    </Typography>
                  </InternalLink>
                </li>

                <li className={classes.listItem}>
                  <InternalLink
                    color="secondary"
                    to={`#`}
                    className={classes.cardoFonts}
                  >
                    <Typography
                      color="secondary"
                      className={classes.cardoFonts}
                      onClick={notifyPoetry}
                    >
                      Photo Poetry
                    </Typography>
                  </InternalLink>
                </li>
              </ul>
            </Grid>
            <Grid item xs={6} sm={4} md={2} align="left">
              <Typography
                variant="h6"
                marked="left"
                className={classes.roboFonts}
              >
                Social
              </Typography>
              <ul className={classes.list}>
                <li className={classes.listItem}>
                  <Link href="https://hyreads.com">
                    <Typography
                      color="secondary"
                      className={classes.cardoFonts}
                    >
                      Hyreads
                    </Typography>
                  </Link>
                </li>
                <li className={classes.listItem}>
                  <Link href="https://facebook.com/Hyreads">
                    <Typography
                      color="secondary"
                      className={classes.cardoFonts}
                    >
                      Facebook
                    </Typography>
                  </Link>
                </li>
                <li className={classes.listItem}>
                  <Link
                    href="https://twitter.com/hyreads"
                    className={classes.cardoFonts}
                  >
                    <Typography
                      color="secondary"
                      className={classes.cardoFonts}
                    >
                      Twitter
                    </Typography>
                  </Link>
                </li>
              </ul>
            </Grid>
            <Grid item xs={6} sm={4} md={2} align="left">
              <Typography
                variant="h6"
                marked="left"
                className={classes.roboFonts}
              >
                Read Mode
              </Typography>
              <Typography component="div">
                <Grid
                  component="label"
                  container
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item>Off</Grid>
                  <Grid item>
                    <Tooltip
                      title={darkState ? 'Energy Saver🙂' : 'Save Energy🙂'}
                    >
                      <AntSwitch
                        checked={darkState}
                        onChange={handleThemeChange}
                        name="read mode"
                      />
                    </Tooltip>
                  </Grid>
                  <Grid item>On</Grid>
                </Grid>
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </div>
  )
}
