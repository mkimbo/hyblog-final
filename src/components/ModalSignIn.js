import React, { useContext } from 'react'
import firebase from 'firebase/app'
import 'firebase/messaging'
import 'firebase/firestore'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import Button from '@material-ui/core/Button'
import { AuthContext } from '../context/auth/auth'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    textAlign: 'center',
    width: '500px',
    fontFamily: "'Roboto', sans-serif",
    borderRadius: '5px',
    margin: '0 15px',
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    '&:focus': {
      outline: 'none',
    },
  },
  button: {
    width: '-webkit-fill-available',
    margin: '20px 0',
    display: 'flex',
    alignItems: 'center',
    border: '1px solid lightgrey',
  },
  google: {
    height: '36px',
    marginRight: '10px',
  },
}))

export default function ModalSignIn({ open, handleClose }) {
  const classes = useStyles()
  const { signUpwithGoogle, onSignInWithFacebook } = useContext(AuthContext)
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
  const Signup = async () => {
    signUpwithGoogle(handleClose)
    askForPermissionToReceiveNotifications()
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <Typography variant="h2" id="transition-modal-title">
            Login to Hyblog
          </Typography>
          <Typography variant="body1" component="p">
            Login to access more content
          </Typography>
          <Button
            onClick={Signup}
            size="large"
            className={classes.button}
            startIcon={
              <div
                className="icons google"
                dangerouslySetInnerHTML={{
                  __html: `<svg className='google-icon' width="34" height="36" viewBox="0 0 34 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0)">
              <path d="M33.5898 18.3935C33.5898 17.2287 33.4953 16.0576 33.2939 14.9117H17.1317V21.5101H26.387C26.003 23.6382 24.7689 25.5207 22.9619 26.717V30.9983H28.4836C31.7261 28.014 33.5898 23.6067 33.5898 18.3935Z" fill="#4285F4"/>
              <path d="M17.1317 35.1349C21.7531 35.1349 25.6504 33.6175 28.4899 30.9983L22.9682 26.717C21.432 27.7621 19.4487 28.354 17.138 28.354C12.6678 28.354 8.87754 25.3381 7.51758 21.2834H1.8196V25.697C4.72841 31.4831 10.653 35.1349 17.1317 35.1349Z" fill="#34A853"/>
              <path d="M7.51129 21.2834C6.79353 19.1553 6.79353 16.851 7.51129 14.7229V10.3093H1.8196C-0.610695 15.151 -0.610695 20.8553 1.8196 25.697L7.51129 21.2834Z" fill="#FBBC04"/>
              <path d="M17.1317 7.64605C19.5746 7.60827 21.9357 8.52751 23.7049 10.2149L28.597 5.32279C25.4993 2.41398 21.3879 0.814769 17.1317 0.865138C10.653 0.865138 4.72841 4.51688 1.8196 10.3093L7.51129 14.7229C8.86495 10.6619 12.6615 7.64605 17.1317 7.64605Z" fill="#EA4335"/>
              </g>
              <defs>`,
                }}
              ></div>
            }
          >
            Login with Google
          </Button>
          <Button
            className={classes.button}
            Disabled
            startIcon={
              <div
                dangerouslySetInnerHTML={{
                  __html: `
                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
fill="#1489cc" stroke="none">
<path d="M2340 5074 c-14 -2 -65 -9 -115 -15 -340 -40 -727 -182 -1025 -376
-211 -137 -451 -352 -598 -535 -284 -352 -466 -764 -539 -1220 -25 -161 -25
-585 0 -746 61 -383 195 -727 404 -1035 104 -154 179 -245 322 -387 385 -382
856 -619 1403 -707 161 -25 585 -25 746 0 547 88 1018 325 1403 707 143 142
218 233 322 387 209 308 343 652 404 1035 25 161 25 585 0 746 -61 383 -195
727 -404 1035 -104 154 -179 245 -322 387 -383 380 -854 618 -1396 706 -95 15
-543 29 -605 18z m730 -826 c0 -7 -26 -29 -58 -48 -31 -19 -61 -38 -67 -43 -5
-4 -41 -32 -80 -60 -165 -124 -209 -162 -365 -317 -69 -69 -154 -163 -190
-209 -36 -47 -84 -108 -107 -138 -24 -29 -43 -55 -43 -58 0 -3 -20 -35 -44
-70 -24 -35 -54 -84 -66 -109 -12 -25 -26 -48 -31 -52 -5 -3 -9 -13 -9 -23 0
-10 -7 -24 -15 -31 -9 -7 -14 -19 -11 -27 3 -8 -1 -16 -8 -19 -8 -3 -17 -17
-21 -31 -3 -14 -14 -44 -25 -67 -10 -22 -24 -60 -30 -83 -6 -23 -15 -45 -20
-48 -6 -4 -8 -10 -5 -15 3 -5 -1 -22 -8 -37 -13 -24 -30 -95 -32 -128 0 -5 -3
-14 -7 -20 -7 -12 -23 -97 -20 -109 2 -4 -1 -13 -6 -20 -5 -6 -8 -31 -6 -56 1
-25 -1 -49 -4 -55 -10 -17 -11 -267 0 -310 5 -22 10 -64 11 -94 1 -52 0 -55
-27 -62 -16 -4 -55 -9 -88 -11 -33 -1 -62 -6 -64 -10 -3 -5 -24 -8 -48 -8 -23
0 -67 -4 -97 -9 -30 -5 -82 -12 -115 -16 l-62 -6 -11 49 c-12 46 -21 339 -11
348 2 3 5 33 7 67 3 84 9 132 17 146 4 6 4 16 1 21 -4 6 -1 17 5 25 6 8 9 19
6 24 -4 5 -2 12 4 16 6 4 8 11 4 16 -9 16 73 287 118 388 12 25 24 55 28 66
19 51 41 95 50 100 6 3 10 13 10 21 0 8 9 23 20 34 11 11 20 29 20 40 0 11 4
20 9 20 6 0 22 22 38 49 42 73 162 226 245 313 81 84 246 231 281 249 12 7 25
17 29 23 4 6 11 11 15 11 4 0 28 14 53 31 86 59 295 174 318 174 6 0 12 5 12
10 0 6 9 10 19 10 11 0 26 7 35 15 8 8 26 16 40 17 14 1 26 6 26 10 0 4 7 8
16 8 8 0 36 9 62 19 58 24 176 61 217 68 17 3 37 9 45 14 22 12 40 11 40 -3z
m770 -939 c15 -61 15 -540 0 -569 -1 -3 -2 -9 -1 -13 1 -4 -6 -34 -14 -66 -8
-33 -15 -72 -15 -89 0 -17 -4 -32 -9 -34 -6 -1 -12 -21 -15 -43 -4 -35 -24
-107 -43 -155 -3 -8 -7 -19 -7 -25 -1 -5 -11 -31 -24 -57 -12 -26 -22 -52 -22
-58 0 -5 -4 -18 -9 -28 -5 -9 -17 -33 -25 -52 -16 -34 -25 -52 -46 -87 -6 -10
-17 -31 -26 -48 -76 -146 -208 -326 -329 -449 -61 -61 -177 -168 -214 -196
-18 -14 -42 -34 -52 -44 -10 -11 -19 -16 -19 -11 0 5 -10 0 -22 -11 -21 -19
-57 -43 -100 -69 -9 -5 -50 -30 -90 -55 -40 -25 -93 -54 -118 -64 -25 -11 -47
-23 -50 -27 -3 -3 -16 -10 -30 -14 -13 -4 -30 -14 -38 -21 -7 -8 -22 -14 -32
-14 -10 0 -22 -4 -25 -10 -3 -5 -13 -10 -21 -10 -8 0 -33 -9 -57 -19 -23 -10
-89 -33 -147 -51 -58 -18 -113 -37 -123 -42 -19 -9 -37 -3 -37 13 0 5 8 12 18
16 23 8 155 104 165 120 4 7 13 13 18 13 6 0 16 6 23 12 8 7 44 38 82 68 132
106 357 343 477 503 63 84 130 179 148 210 19 32 44 74 56 95 21 36 55 102 67
132 3 8 10 22 15 30 12 20 35 75 52 125 8 22 18 43 24 47 5 4 6 10 3 14 -4 4
-3 14 1 23 5 9 16 40 25 69 l15 54 -77 -81 c-107 -110 -161 -135 -282 -129
-78 4 -94 8 -145 39 -72 43 -153 136 -263 303 -100 151 -202 259 -281 299 -86
42 -164 34 -215 -22 -24 -27 -34 -26 -69 2 l-29 23 55 57 c100 104 239 148
373 118 70 -16 186 -93 245 -162 25 -30 85 -113 132 -186 186 -287 342 -365
454 -228 l31 38 34 -24 c18 -13 36 -27 40 -33 3 -5 12 25 18 67 7 43 16 77 19
77 4 0 8 17 9 38 3 45 9 87 12 87 3 0 12 186 11 250 -1 33 -1 83 0 112 0 28
-6 66 -13 85 -7 18 -13 58 -13 88 0 48 3 55 20 57 29 4 153 21 205 28 25 4 79
13 120 20 41 7 96 14 122 14 l46 1 12 -51z"/>
</g>
</svg>
      `,
                }}
              ></div>
            }
          >
            Login With Hyreads
          </Button>
        </div>
      </Fade>
    </Modal>
  )
}
