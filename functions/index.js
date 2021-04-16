const functions = require('firebase-functions')
const Axios = require('axios')
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
