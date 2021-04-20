import React from 'react'
import Particles from 'react-tsparticles'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import QaIcon from '../images/qaIcon.png'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
  mainParticles: {
    position: 'relative',
    backgroundColor: 'transparent',
    color: theme.palette.primary,
    marginBottom: theme.spacing(4),
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: '350px',
  },
  content: {
    backgroundColor: '#1489cc',
  },
  overlay: {
    background: 'transparent',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  mainParticlesContent: {
    position: 'relative',
    textAlign: 'center',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}))

export default function QAParticles(props) {
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
              number: { value: 100 },
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
              <img
                src={QaIcon}
                style={{ maxWidth: '250px', maxHeight: '250px' }}
                alt={title}
                loading="lazy"
              />
              <Typography
                variant="h6"
                color="secondary"
                className={classes.content}
              >
                with Grand Philosopher
              </Typography>
            </div>
          </Grid>
        </Grid>
      </div>
    </Paper>
  )
}

QAParticles.propTypes = {
  title: PropTypes.string,
}
