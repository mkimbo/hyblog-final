import React from 'react'
import Particles from 'react-tsparticles'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import EmailIcon from '@material-ui/icons/Email'
import PreviewImage from './PreviewImage'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import { Card, CardActions, CardContent } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  mainParticles: {
    position: 'relative',
    backgroundColor: '#303030',
    color: theme.palette.primary,
    marginBottom: theme.spacing(4),
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: '400px',
  },
  overlay: {
    background: 'transparent',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  content: {
    backgroundColor: '#1489cc',
    padding: '0px 2px',
  },
  contentCard: {
    backgroundColor: 'rgba(48, 48, 48, 0.8)',
  },
  button: {
    fontFamily: 'Roboto, sans-serif',
  },
  flexActions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileImage: {
    maxWidth: '100px',
    maxHeight: '100px',
    margin: '2px auto',
  },
  contentCard: {
    backgroundColor: 'rgba(48, 48, 48, 0.8)',
  },
  mainParticlesContent: {
    position: 'relative',
    textAlign: 'center',
    padding: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}))

export default function AuthorParticles({ author }) {
  const classes = useStyles()

  return (
    <Paper className={classes.mainParticles}>
      <div>
        <Particles
          height="400px"
          params={{
            fpsLimit: 60,
            interactivity: {
              detectsOn: 'canvas',
              events: {
                resize: true,
                onHover: {
                  enable: true,
                  mode: 'slow',
                },
              },
            },
            particles: {
              color: { value: '#e6e6f7' },
              links: {
                color: '#c5c5d6',
                distance: 100,
                enable: true,
                opacity: 1,
                width: 1,
              },
              number: { value: 50 },
              move: {
                enable: true,
              },
              opacity: {
                value: 1,
                random: true,
              },

              stroke: { color: '#ffffff', width: 3 },
              size: {
                value: 10,
              },
            },
            retina_detect: true,
          }}
        />
      </div>
      <div className={classes.overlay}>
        <Grid container className={classes.mainParticlesContent}>
          <Card className={classes.contentCard}>
            <div className={classes.profileImage}>
              <PreviewImage
                filename={author.avatar[0].localFile.name}
                alt={author.name}
              />
            </div>
            <CardContent>
              <Typography
                variant="h6"
                color="secondary"
                className={classes.content}
              >
                {author.name}
              </Typography>
              <Typography color="secondary" variant="subtitle1">
                {author.tagline}
              </Typography>
            </CardContent>
            <CardActions className={classes.flexActions}>
              {author.twitter ? (
                <Button
                  component="a"
                  href={`https://twitter.com/${author.twitter}`}
                  variant="outlined"
                  color="primary"
                  className={classes.button}
                  startIcon={<PersonAddIcon color="primary" />}
                  size="small"
                >
                  Follow
                </Button>
              ) : (
                <Button
                  component="a"
                  href={`https://facebook.com/${author.facebook}`}
                  variant="outlined"
                  color="primary"
                  className={classes.button}
                  startIcon={<PersonAddIcon color="primary" />}
                  size="small"
                >
                  Follow
                </Button>
              )}
              <Button
                component="a"
                href={`mailto:${author.email}`}
                variant="outlined"
                color="primary"
                className={classes.button}
                startIcon={<EmailIcon color="primary" />}
                size="small"
              >
                Message
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </div>
    </Paper>
  )
}

AuthorParticles.propTypes = {
  title: PropTypes.string,
}
