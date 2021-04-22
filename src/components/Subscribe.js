import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import CardContent from '@material-ui/core/CardContent'

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  gridForm: {
    width: '100%',
    display: 'grid',
    gridGap: '5px',
    gridTemplateColumns: '3fr 1fr',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    fontFamily: 'Roboto, sans-serif',
  },
  newsletter: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  subscribe: {
    display: 'grid',
  },
}))

const SubscriptionForm = () => {
  const classes = useStyles()
  const [status, setStatus] = useState(null)
  const [email, setEmail] = useState('')

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
          Email sent! — confirm the subscription in your inbox
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
          variant="contained"
          color="primary"
          className={classes.submit}
          size="large"
        >
          Join
        </Button>
      </div>
    </form>
  )

  return (
    <Card elevation={1} className={classes.newsletter}>
      <Typography variant="h6">
        <strong>Stay in the know</strong> with our weekly newsletter, the best
        of Hyblog, delivered to your mail box every Tuesday.
      </Typography>
      <CardContent>{newsletter}</CardContent>
    </Card>
  )
}

export default SubscriptionForm
