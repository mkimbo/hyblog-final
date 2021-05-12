import React, { useContext } from 'react'
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
  const { signUpwithGoogle } = useContext(AuthContext)

  const Signup = async () => {
    signUpwithGoogle(handleClose)
  }

  return (
    <Modal
      aria-labelledby="Login"
      aria-describedby="Login Modal"
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
            Sign In
          </Typography>
          <Typography variant="body1" component="p">
            Sign In and dont forget to Subscribe.
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
            disabled
            startIcon={
              <div
                dangerouslySetInnerHTML={{
                  __html: `
                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                  width="34.000000pt" height="36.000000pt" viewBox="0 0 34.000000 36.000000"
                  preserveAspectRatio="xMidYMid meet">

                  <g transform="translate(0.000000,36.000000) scale(0.100000,-0.100000)"
                  fill="#1489cc" stroke="none">
                  <path d="M95 327 c-104 -59 -114 -211 -18 -284 74 -57 182 -32 231 52 18 32
                  22 51 19 96 -4 67 -31 111 -87 139 -51 26 -96 25 -145 -3z m105 -37 c0 -5 -6
                  -13 -12 -17 -7 -4 -19 -15 -26 -25 -11 -14 -9 -20 11 -42 32 -34 47 -33 47 3
                  0 27 20 47 34 34 11 -11 6 -63 -8 -96 -14 -36 -69 -87 -92 -87 -20 0 -18 8 16
                  46 l29 34 -27 29 c-31 33 -52 25 -52 -20 0 -22 -5 -29 -20 -29 -45 0 -8 128
                  47 162 31 19 53 23 53 8z"/>
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
