import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import 'firebase/messaging'
import Button from '@material-ui/core/Button'
import firebaseConfig from '../firebase/firebaseConfig'
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
const askForPermissionToReceiveNotifications = () => {
  try {
    messaging
      .getToken({
        vapidKey:
          'BMecJpNN4bvzeZT_Oc99N7qUpwzUO8iWR5nIM59aaxGAuf7iR7O7GTx3y0qg-MqszfT1bfT3TO4cLAQ698Pnpkc',
      })
      .then((currentToken) => {
        console.log(currentToken)
        if (currentToken) {
          app
            .firestore()
            .collection('subscriptions')
            .doc()
            .set({ token: currentToken })
            .catch((err) => console.log(err))
        } else {
          // Show permission request UI
          Notification.requestPermission()
          console.log(
            'No registration token available. Request permission to generate one.'
          )
          console.log(currentToken)
          // ...
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token..', err)
        // ...
      })
  } catch (error) {
    console.error(error)
  }
}

function Notifications() {
  return (
    <Button
      variant="outlined"
      color="secondary"
      onClick={askForPermissionToReceiveNotifications}
    >
      Subscribe
    </Button>
  )
}

export default Notifications
