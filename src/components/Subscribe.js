import React, { useState } from 'react'
import {
  Typography,
  Grid,
  Card,
  Button,
  TextField,
  ListItem,
  List,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import { notify } from 'react-notify-toast'
import EmailIcon from '@material-ui/icons/Email'
import SendIcon from '@material-ui/icons/Send'
import icon from '../images/Hycon.png'

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  gridForm: {
    width: '100%',
    display: 'grid',
    gridGap: '5px',
    gridTemplateColumns: '3fr 1fr',
    marginTop: '10px',
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  submit: {
    width: '100%',
    height: '100%',
    fontFamily: 'Roboto, sans-serif',
  },
  enter: {
    width: '100%',
    height: '100%',
    color: '#fff',
  },
  newsletter: {
    padding: '10px',
    textAlign: 'center',
    backgroundColor: '#1489cc',
  },
  subscribe: {
    display: 'grid',
  },
}))

const SubscriptionForm = () => {
  const classes = useStyles()
  const [status, setStatus] = useState(null)
  const [email, setEmail] = useState('')

  function remindSubscriber() {
    setTimeout(() => {
      notify.show(
        'Hello, please confirm the subscription sent to your mailbox, Thank You🙂.',
        'success'
      )
    }, 45000)
  }

  //FORM_URL to ConvertKit
  const FORM_URL = `https://app.convertkit.com/forms/2173054/subscriptions`

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
        remindSubscriber()

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
      {status === 'SUCCESS' && (
        <Alert severity="success">
          Success! — Please confirm the subscription in your mailbox in about 30
          seconds.
        </Alert>
      )}
      {status === 'ERROR' && (
        <Alert severity="error">
          Oops, Something went wrong! refresh the page and try again!
        </Alert>
      )}
      <div className={classes.gridForm}>
        <TextField
          variant="outlined"
          onChange={handleInputChange}
          value={email}
          required
          fullWidth
          className={classes.enter}
          color="secondary"
          id="email"
          label="Email Address"
          name="email_address"
          autoComplete="email"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
          size="large"
        >
          <SendIcon color="secondary" style={{ verticalAlign: 'middle' }} />
        </Button>
      </div>
    </form>
  )

  return (
    <Card elevation={1} className={classes.newsletter}>
      <div>
        <List dense>
          <ListItem>
            <ListItemAvatar>
              <Avatar
                className={classes.large}
                aria-label="hyblog"
                alt="hyblog"
                src={icon}
              >
                H
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography className={classes.roboFonts} variant="h5">
                  Hyblog Email NewsLetter
                </Typography>
              }
            />
          </ListItem>
        </List>
      </div>
      <Grid align="center">
        <EmailIcon style={{ fontSize: '60px' }} color="secondary" />
        <Typography variant="subtitle1" color="secondary">
          Keep Updated. Subscribe to Our Weekly Newsletter.
        </Typography>
      </Grid>
      <Grid>{newsletter}</Grid>
    </Card>
  )
}

export default SubscriptionForm
