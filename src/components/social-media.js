import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Fab } from '@material-ui/core'
import { Facebook, Twitter, Instagram } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  SocialMedia: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'start',
    alignContent: 'center',
    alignItems: 'center',
    margin: '5px 7px',
    width: 'fit-content',
  },
  fab: {
    margin: '0px 10px',
  },
  facebook: {
    color: '#357cda',
  },
  twitter: {
    color: '#1d07e6',
  },
  instagram: {
    color: '#f30843',
  },
}))

const SocialMedia = () => {
  const classes = useStyles()
  return (
    <div className={classes.SocialMedia}>
      <Fab className={classes.fab}>
        <a
          href="https://facebook.com/Hyreads"
          alt="Link to Hyreads Facebookaccount"
        >
          <Facebook
            style={{ verticalAlign: 'middle' }}
            className={classes.facebook}
          />
        </a>
      </Fab>
      <Fab className={classes.fab}>
        <a
          href="https://twitter.com/hyreads"
          alt="Link to Hyreads Twitter account"
        >
          <Twitter
            style={{ verticalAlign: 'middle' }}
            className={classes.twitter}
          />
        </a>
      </Fab>
      <Fab className={classes.fab}>
        <a
          href="https://instagram.com/hyreads"
          alt="Link to Hyreads Instagram account"
        >
          <Instagram
            style={{ verticalAlign: 'middle' }}
            className={classes.instagram}
          />
        </a>
      </Fab>
    </div>
  )
}

export default SocialMedia
