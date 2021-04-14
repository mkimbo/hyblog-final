//
// const functions = require('firebase-functions')
// if (typeof window !== 'undefined') {
//   global.fetch = require('node-fetch')
// }
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
// Listen for changes in all documents in the 'users' collection
// const WEBHOOK_URL =
//   'https://api.netlify.com/build_hooks/6061f6d9df9abc458234763a'

// exports.useWildcard = functions.firestore
//   .document('fl_content/{fl_id}')
//   .onWrite((change, context) => {
//     if (WEBHOOK_URL) {
//       console.log('Gatsby build request will be sent')
//       if (typeof window !== 'undefined') {
//         global.fetch(WEBHOOK_URL, { method: 'POST' }).then(() => {
//           console.log('Gatsby build request successful sent')
//         })
//       }
//     }
//   })
