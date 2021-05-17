import React, { useEffect, useState } from 'react'
import firebase from 'firebase/app'
import 'firebase/messaging'
import 'firebase/firestore'
import Button from '@material-ui/core/Button'
import { CircularProgress } from '@material-ui/core'
import firebaseConfig from '../firebase/firebaseConfig'
import { notify } from 'react-notify-toast'
import { makeStyles } from '@material-ui/core/styles'
import { Fragment } from 'react'

const useStyles = makeStyles((theme) => ({
  submit: {
    fontFamily: 'Roboto, sans-serif',
  },
}))

const app = typeof window != 'undefined' ? firebase.app() : null
// Add the public key generated from the console here.
const messaging =
  typeof window != 'undefined'
    ? app.messaging({
        apiKey: 'AIzaSyBJug1i8t6s6BIwPbWyoDiwz3u1GMjmMP4',
        projectId: 'hyblog',
        messagingSenderId: '534749721390',
      })
    : null

const hasNotificationPermission = async () => {
  if (Notification.permission === 'granted') {
    return true
  } else if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission()
    if (permission === 'granted') {
      return true
    }
  }
  return false
}

const pushSupported = () => {
  if (typeof window !== `undefined`) {
    if ('PushManager' in window) {
      return true
    }
  }
  return false
}

if (typeof window !== 'undefined') {
  firebase.messaging().onMessage(function (payload) {
    const notificationTitle = payload.notification.title
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.icon,
    }

    if (!('Notification' in window)) {
      console.log('This browser does not support system notifications')
    }
    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === 'granted') {
      // If it's okay let's create a notification
      var notification = new Notification(
        notificationTitle,
        notificationOptions
      )
      notification.onclick = function (event) {
        event.preventDefault() // prevent the browser from focusing the Notification's tab
        window.open(payload.notification.click_action, '_blank')
        notification.close()
      }
    }
  })
}

function Notifications() {
  const classes = useStyles()
  const [subscribed, setSubscribed] = useState(false)
  const [working, setWorking] = useState(false)
  const createSubscription = async () => {
    notify.hide()
    const hasPermission = await hasNotificationPermission()
    if (pushSupported() && hasPermission) {
      setWorking(true)
      messaging
        .getToken({
          vapidKey:
            'BMecJpNN4bvzeZT_Oc99N7qUpwzUO8iWR5nIM59aaxGAuf7iR7O7GTx3y0qg-MqszfT1bfT3TO4cLAQ698Pnpkc',
        })
        .then((currentToken) => {
          console.log(currentToken)
          app
            .firestore()
            .collection('subscriptions')
            .doc(currentToken)
            .set({
              token: currentToken,
            })
            .then(() => {
              setSubscribed(true)
              localStorage.setItem('pushToken', currentToken)

              notify.show('Hyblog notifications enabled.', 'success')
              setWorking(false)
            })
            .catch((err) => console.log(err))
        })
        .catch((err) => console.log(`Error getting token`, err))
    } else if (!pushSupported()) {
      notify.show('Your browser doesnt support Notifications', 'error')
    } else {
      notify.show('Allow notifications to proceed', 'error')
    }
  }

  const unsubscribe = async () => {
    notify.hide()
    if (pushSupported() && subscribed) {
      setWorking(true)
      const userToken = localStorage.getItem('pushToken')
      app
        .firestore()
        .collection('subscriptions')
        .doc(userToken)
        .delete()
        .then(() => {
          localStorage.removeItem('pushToken')
          notify.show('Hyblog notifications disabled', 'success')
          setSubscribed(false)
        })
        .catch((err) => console.log(err))
    }
    setWorking(false)
  }

  useEffect(() => {
    const status = localStorage.getItem('pushToken')
    if (status) {
      setSubscribed(true)
    }
  }, [])

  const btnText = subscribed ? 'Subscribed' : 'Subscribe'
  const callback = subscribed ? unsubscribe : createSubscription
  return (
    <Fragment>
      {working ? (
        <CircularProgress
          size={22}
          color="secondary"
          className={classes.submit}
        />
      ) : (
        <Button
          onClick={callback}
          size="small"
          variant="outlined"
          color="secondary"
          className={classes.submit}
          disabled={working}
        >
          {btnText}
        </Button>
      )}
    </Fragment>
  )
}

export default Notifications
