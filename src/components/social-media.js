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
      <a
        href="https://facebook.com/Hyreads"
        alt="Link to Hyreads Facebookaccount"
      >
        <Fab size="small" className={classes.fab}>
          <Facebook
            style={{ verticalAlign: 'middle' }}
            className={classes.facebook}
          />
        </Fab>
      </a>
      <a
        href="https://twitter.com/hyreads"
        alt="Link to Hyreads Twitter account"
      >
        <Fab size="small" className={classes.fab}>
          <Twitter
            style={{ verticalAlign: 'middle' }}
            className={classes.twitter}
          />
        </Fab>
      </a>
      <a
        href="https://instagram.com/hyreads"
        alt="Link to Hyreads Instagram account"
      >
        <Fab size="small" className={classes.fab}>
          <Instagram
            style={{ verticalAlign: 'middle' }}
            className={classes.instagram}
          />
        </Fab>
      </a>
    </div>
  )
}

export default SocialMedia
