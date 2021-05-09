import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Img from 'gatsby-image'

const useStyles = makeStyles((theme) => ({
  mainParticles: {
    color: theme.palette.primary,
    marginBottom: theme.spacing(4),
    height: '450px',
    [theme.breakpoints.down('sm')]: {
      height: '350px',
    },
  },
}))

export default function MainParticles(props) {
  const classes = useStyles()
  const { category } = props
  console.log(category.coverArt[0].localFile.name)
  return (
    <Paper className={classes.mainParticles}>
      <Img
        fluid={category.coverArt[0].localFile.childImageSharp.fluid}
        alt={category.tagline}
        style={{ height: '100%', width: '100%' }}
        imgStyle={{ objectFit: 'fill' }}
      />
    </Paper>
  )
}
