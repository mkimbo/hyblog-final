import React from 'react'
import Particles from 'react-tsparticles'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import LocalImage from './LocalImage'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
  mainParticles: {
    position: 'relative',
    backgroundColor: '#303030',
    color: theme.palette.primary,
    marginBottom: theme.spacing(4),
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: '350px',
  },
  icon: { maxWidth: '250px', maxHeight: '250px' },
  overlay: {
    background: 'transparent',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  content: {
    backgroundColor: '#1489cc',
  },
  mainParticlesContent: {
    position: 'relative',
    textAlign: 'center',
    minWidth: '250px',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}))

export default function MainParticles(props) {
  const classes = useStyles()
  const { title } = props
  return (
    <Paper className={classes.mainParticles}>
      <div>
        <Particles
          height="350px"
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
        <Grid container>
          <Grid item md={12}>
            <div className={classes.mainParticlesContent}>
              <LocalImage filename={`icon`} alt={`Hyblog Icon`} />

              <Typography
                variant="h6"
                color="secondary"
                className={classes.content}
              >
                {title}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </div>
    </Paper>
  )
}

MainParticles.propTypes = {
  title: PropTypes.string,
}
