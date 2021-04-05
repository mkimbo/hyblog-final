import { Link } from 'gatsby'
import React from 'react'
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  homeRedirect: {
    textDecoration: 'none',
    color: theme.palette.primary,
    fontFamily: 'Roboto, sans-serif',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  mainbox: {
    backgroundColor: '#95c2de',
    margin: 'auto',
    height: '600px',
    width: '600px',
    position: 'relative',
  },

  err: {
    color: '#ffffff',
    fontFamily: 'Cardo, sans-serif',
    fonSize: '11rem',
    position: 'absolute',
    left: '20%',
    top: '8%',
  },

  far: {
    position: 'absolute',
    fonSize: '8.5rem',
    left: '42%',
    top: '15%',
    color: '#ffffff',
  },

  err2: {
    color: '#ffffff',
    fontFamily: 'Cardo, sans-serif',
    fonSize: '11rem',
    position: 'absolute',
    left: '68%',
    top: '8%',
  },

  msg: {
    textAlign: 'center',
    fontFamily: 'Cardo, sans-serif',
    fontSize: '1.6rem',
    position: 'absolute',
    left: '16%',
    top: '45%',
    width: '75%',
  },
}))
function NotFound() {
  const classes = useStyles()
  return (
    <div className={classes.mainbox}>
      <div className={classes.err}>4</div>
      <NotListedLocationIcon color="primary" className={classes.far} />
      <div className={classes.err2}>4</div>
      <div className={classes.msg}>
        Maybe this page moved? Got deleted? Is hiding out in quarantine? Never
        existed in the first place?
        <p>
          Let's go
          <Link className={classes.homeRedirect} to={`/`}>
            home
          </Link>
          and try from there.
        </p>
      </div>
    </div>
  )
}

export default NotFound
