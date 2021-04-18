const functions = require('firebase-functions')
const Axios = require('axios')
const admin = require('firebase-admin')
admin.initializeApp()
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
// Listen for changes in all documents in the 'users' collection
const WEBHOOK_URL =
  'https://api.netlify.com/build_hooks/60795e33a46e67b672c3d83f'

exports.useWildcard = functions.firestore
  .document('fl_content/{fl_id}')
  .onWrite((change, context) => {
    if (WEBHOOK_URL) {
      console.log('Gatsby build request will be sent')

      Axios.post(WEBHOOK_URL).then(() => {
        console.log('Gatsby build request successful sent')
      })
    }
  })

exports.sendNewPostNotification = functions.firestore
  .document('fl_content/{fl_id}')
  .onCreate(async (change, context) => {
    let tokens = []
    const snapshot = await admin.firestore().collection('subscriptions').get()
    if (snapshot.empty) {
      console.log('No tokens to send notifications to')
    }
    snapshot.forEach((doc) => {
      // Listing all tokens as an array.
      tokens.push(doc.data().token)
    })
    console.log(tokens)
    // Notification details.
    const post = await admin
      .firestore()
      .collection('fl_content')
      .orderBy('_fl_meta_.createdDate', 'desc')
      .limit(1)
      .get()
    const postData = post.docs[0].data()
    const payload = {
      notification: {
        title: postData.title ? postData.title : postData.question,
        body: postData.summary,
        icon: `https://hyblog.info/assets/icon.png`,
        click_action: `https://hyblog.info/${postData.slug}/`,
      },
    }
    // Send notifications to all tokens.
    const response = await admin.messaging().sendToDevice(tokens, payload)
    // For each message check if there was an error.
    const tokensToRemove = []
    response.results.forEach((result, index) => {
      const error = result.error
      if (error) {
        functions.logger.error(
          'Failure sending notification to',
          tokens[index],
          error
        )
        // Cleanup the tokens who are not registered anymore.
        if (
          error.code === 'messaging/invalid-registration-token' ||
          error.code === 'messaging/registration-token-not-registered'
        ) {
          tokensToRemove.push(snapshot.docs[index].ref.delete())
        }
      }
    })
    return Promise.all(tokensToRemove)
  })
