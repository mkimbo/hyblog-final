import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import 'firebase/messaging'
import 'firebase/firestore'
import NotificationsIcon from '@material-ui/icons/Notifications'
import firebaseConfig from '../firebase/firebaseConfig'
import { IconButton } from '@material-ui/core'
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
            .doc(currentToken)
            .set({
              token: currentToken,
            })
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
useEffect(() => {
  messaging.onMessage(function (payload) {
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
}, [])

function Notifications() {
  return (
    <IconButton onClick={askForPermissionToReceiveNotifications}>
      <NotificationsIcon color="secondary" />
    </IconButton>
  )
}

export default Notifications
