import { Link } from 'gatsby'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import TopLayout from '../components/TopLayout'

const useStyles = makeStyles((theme) => ({
  homeRedirect: {
    textDecoration: 'none',
    color: '#fff',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  mainbox: {
    backgroundColor: '#1489cc',
    margin: 'auto',
    height: '600px',
    textAlign: 'center',
  },

  msg: {
    textAlign: 'center',
    fontFamily: 'Cardo, sans-serif',
    fontSize: '1.6rem',
  },
}))
function NotFound() {
  const classes = useStyles()
  return (
    <TopLayout>
      <div className={classes.mainbox}>
        <Typography variant="h1" color="initial">
          404
        </Typography>
        <Typography variant="h2" color="initial">
          Page Not Found
        </Typography>

        <div className={classes.msg}>
          <Typography variant="h6" color="initial">
            Maybe this page moved? Got deleted? Is hiding out in quarantine?
            Never existed in the first place?
          </Typography>

          <Typography variant="h6">
            Let's start from the
            <Link className={classes.homeRedirect} to={`/`}>
              {' '}
              Home Page
            </Link>
          </Typography>
        </div>
      </div>
    </TopLayout>
  )
}

export default NotFound
