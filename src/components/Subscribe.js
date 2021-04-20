import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import { askForPermissionToReceiveNotifications } from './Notifications'
import {
  Dialog,
  CardActions,
  CardContent,
  DialogTitle,
} from '@material-ui/core'
import icon from '../images/icon.png'

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    fontFamily: 'Roboto, sans-serif',
  },
  dialogHeader: {
    display: 'flex',
    flexDirection: 'row',
  },
  subscribe: {
    display: 'grid',
  },
}))

const SubscriptionForm = () => {
  const [open, setOpen] = React.useState(false)
  const classes = useStyles()
  const [status, setStatus] = useState(null)
  const [email, setEmail] = useState('')

  //FORM_URL should be the same as the form action url pointed out above
  const FORM_URL = `https://app.convertkit.com/forms/2173054/subscriptions`

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    try {
      const response = await fetch(FORM_URL, {
        method: 'post',
        body: data,
        headers: {
          accept: 'application/json',
        },
      })
      setEmail('')
      const json = await response.json()
      if (json.status === 'success') {
        setStatus('SUCCESS')
        return
      }
    } catch (err) {
      setStatus('ERROR')
      console.log(err)
    }
  }

  const handleInputChange = (event) => {
    const { value } = event.target
    setEmail(value)
  }
  const newsletter = (
    <form
      className={classes.form}
      noValidate
      action={FORM_URL}
      method="post"
      onSubmit={handleSubmit}
    >
      <Grid container>
        <Grid item xs>
          <Typography variant="h6">
            Join our weekly newsletter to receive customized content right into
            your mailbox!
          </Typography>
        </Grid>
      </Grid>
      {status === 'SUCCESS' && (
        <Alert severity="success">
          Email sent! — confirm the subscription in your inbox
        </Alert>
      )}
      {status === 'ERROR' && (
        <Alert severity="error">
          Oops, Something went wrong! refresh the page and try again!
        </Alert>
      )}
      <TextField
        variant="outlined"
        margin="normal"
        onChange={handleInputChange}
        value={email}
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email_address"
        autoComplete="email"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Join Weekly Newsletter
      </Button>
      <Grid container>
        <Grid item xs align="center">
          <Typography variant="body2">OR</Typography>
        </Grid>
      </Grid>
    </form>
  )
  const notifications = (
    <Grid item xs>
      <Typography variant="h6">
        Simply allow browser notifications to get the latest articles instantly,
        even while offline.
      </Typography>
      <Button
        onClick={askForPermissionToReceiveNotifications}
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Allow Notifications
      </Button>
    </Grid>
  )
  return (
    <div className={classes.subscribe}>
      <Button
        onClick={handleOpen}
        fullWidth
        variant="outlined"
        color="secondary"
        className={classes.submit}
        size="small"
      >
        Subscribe
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="subscribe-dialog"
      >
        <Card elevation={0} className={classes.sidebarAboutBox}>
          <CardContent>
            {newsletter}
            {notifications}
          </CardContent>
        </Card>
      </Dialog>
    </div>
  )
}

export default SubscriptionForm
