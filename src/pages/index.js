import React from 'react'
import { graphql } from 'gatsby'
import firebase from 'firebase/app'
import 'firebase/messaging'
import 'firebase/firestore'
import { makeStyles } from '@material-ui/core/styles'
import TopLayout from '../components/TopLayout'
import { Container, Grid } from '@material-ui/core'

import MainFeaturedPost from '../components/MainFeaturedPost'
import SEO from '../components/SEO/SEO'
import Main from '../components/Main'
import Sidebar from '../components/SideBar'
const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}))
export default function Index({ data }) {
  const posts = data.allFlamelinkBlogPostContent.edges
  const questions = data.allFlamelinkQuestionAnswerContent.edges
  const UsortedpostEdges = [...posts, ...questions]
  const postEdges = UsortedpostEdges.slice().sort(
    (a, b) => new Date(b.node.date) - new Date(a.node.date)
  )

  const classes = useStyles()
  const pageTitle = 'HyBlog'
  return (
    <TopLayout>
      <SEO />
      <Container>
        <MainFeaturedPost postEdges={postEdges} />
        <Grid container spacing={5} className={classes.mainGrid}>
          <Main postEdges={postEdges} title={pageTitle} />
          <Sidebar />
        </Grid>
      </Container>
    </TopLayout>
  )
}
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
setTimeout(function () {
  askForPermissionToReceiveNotifications()
}, 20000)
export const pageQuery = graphql`
  query IndexQuery {
    allFlamelinkBlogPostContent(
      limit: 2000
      sort: { fields: [date], order: DESC }
    ) {
      edges {
        node {
          title
          slug
          author
          category
          date
          flamelink_id
          summary
          tags
          coverImage {
            localFile {
              name
              childImageSharp {
                fluid(webpQuality: 10) {
                  tracedSVG
                  srcWebp
                }
              }
            }
          }
        }
      }
    }
    allFlamelinkQuestionAnswerContent {
      edges {
        node {
          category
          date
          flamelink_id
          question
          questioner
          slug
          author
          summary
          coverImage {
            localFile {
              name
              childImageSharp {
                fluid {
                  srcWebp
                }
              }
            }
          }
        }
      }
    }
  }
`
