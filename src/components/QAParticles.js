import React from 'react'
import Particles from 'react-tsparticles'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import EmailIcon from '@material-ui/icons/Email'
import { Card, CardActions, CardContent, Button } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import CategoryArt from './CategoryArt'

const useStyles = makeStyles((theme) => ({
  mainParticles: {
    position: 'relative',
    backgroundColor: '#303030',
    color: theme.palette.primary,
    marginBottom: theme.spacing(4),
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: '450px',
  },
  content: {
    backgroundColor: '#1489cc',
    padding: '0px 2px',
  },
  content2: {
    backgroundColor: 'rgba(48, 48, 48, 0.8)',
  },
  contentCard: {
    backgroundColor: 'transparent',
  },
  overlay: {
    background: 'transparent',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  button: {
    fontFamily: 'Roboto, sans-serif',
  },
  flexActions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  profileImage: {
    maxWidth: '150px',
    maxHeight: '150px',
    margin: '2px auto',
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

export default function QAParticles() {
  const classes = useStyles()

  return (
    <Paper className={classes.mainParticles}>
      <div>
        <Particles
          height="450px"
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
              <CategoryArt filename={`qaIcon`} alt={`QA Icon`} />
            </div>

            <CardContent>
              <Typography
                variant="h6"
                color="secondary"
                className={classes.content}
              >
                with Grand Philosopher
              </Typography>
              <Typography
                variant="subtitle1"
                color="secondary"
                className={classes.content2}
              >
                Engage with Grand Philosopher on Hyblog. Mail your questions to
                grand_philosopher@hyblog.info or using the button below.
              </Typography>
            </CardContent>
            <CardActions className={classes.flexActions}>
              <Button
                component="a"
                href={`mailto:grand_philosopher@hyblog.info`}
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<EmailIcon color="secondary" />}
                size="small"
              >
                Mail Your Question
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </div>
    </Paper>
  )
}

QAParticles.propTypes = {
  title: PropTypes.string,
}
