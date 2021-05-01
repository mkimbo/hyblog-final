require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const path = require('path')
const config = {
  siteGATrackingID: 'UA-188439956-1',
}

module.exports = {
  siteMetadata: {
    title: 'HyBlog - Official Hybra Blog',
    description: `
      Creating impactful conversations on real issues by Educating Enlightening and Empowering one other for the betterment of society.
    `,
    siteUrl: 'https://hyblog.info/',
    image: '/assets/favicon.svg',
    author: {
      name: 'Hyblog Admin',
    },
    organization: {
      name: 'Hybra, Inc.',
      url: 'https://hyreads.com',
      logo: '/assets/favicon.svg',
    },
    social: {
      twitter: '@hyreads',
      fbAppID: '',
    },
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-twitter',
    'gatsby-transformer-sharp',
    'gatsby-plugin-emotion',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'src',
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'posts',
        path: `${__dirname}/src/content`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          config.siteGATrackingID, // Google Analytics / GA
        ],
      },
    },
    {
      resolve: `gatsby-plugin-scroll-reveal`,
      options: {
        threshold: 0.05,
        rootMargin: '100px 0px',
      },
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `blue`,
        showSpinner: false,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics-reporter`,
      options: {
        email: 'hyblog-analytics@hyblog.iam.gserviceaccount.com',
        privateKey:
          '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCZ2WKVZSyzOTFw\n6qLZi/0UYniR0BvVR4diwqsztaZFl5Qi7jV5f/I5zvv2Tv/Iwza66RPwh4aVxddd\ndgiWELdsI5Q0BSZl8l0KO/9LB18umqX+sBHd2u+bQSPxrF+XeBtxbrch8VeGU9PA\nyKUZVxVVK/kFNA1yR66Q4GxRUhkYwgZjWgIZ6zyrHM/fRbxrukDknetEGzzOQMnm\nu8uesaLGV39SVsKF+eQH2wFfnjYp72WBO4w/xTuPhrSqshbhO1kTcoeJQSN2heEz\nwMD54Ni7ZwqZJXr7z3A8V0YnsKpEbr5YpQ+9hmr4/XUg1sRq1r4a2j/Zm7wi+jje\nFrPpC59zAgMBAAECggEABmLsQThcdSokH8RVs0Mo4848pAzoAt//wj1DfxeEyfHD\nX/nUdXE2vGiXs/9OheZ4oKSpQ7xUfWYjjQknzRbvjkkhz1EBaYz4iMK508MAE/6u\nclabv0Jl3OOE2vTlWPPO69QFPR74G6biLOgHVnhzdcAoC6u//ST1naT7Shrm2Myw\nmeyt5qrRJS2TQRjxSC5IvXfAlIksQDYsAhh9kUzDD0uk4gBeT0+hloaPDgR4LqNy\nNYc3VOkz5eXtINGJu3XtmlK/crJCpQJ9X46fw6nOwKMVUe2UmikV2bBHsrovVl8g\nOgOfKjQgE/p9CzgmxWQcUFg9x00LnOmyp4Lkgewa/QKBgQDPmFZ4ukjNH6jN68XU\ndR15M/aOOCj6SsNqzfiKtSLV/CatAx0+c585qs9jy0t2SpuwOoE04zs9oMUepqem\nd+cjnfAsTSeZBma50uRURCmKzFl0jaTNydfTxuc96rPmflRKGRSmNyMvYNbA8sPC\nkJSPFlJfT0wg9vlAyCVca/oGFQKBgQC9uN+DOXTQkAsXk/ghcnE4EbgPz2p+Oy5O\ndnydqv9DWdDSh/GMAZwfLJ3vHDOtdzFgNkRyWzfoR7KTE10N74A954acx+nMwNjf\nMvC4Vuc1nTODOUq1B6bHJ46sKQyRSJ+87XnPr/PitPCMBtDnE7fKMYFrbayJ0HZC\nQ5/BRla5ZwKBgQCQb6+KZCIPBf4O+AI25h1RnQPow85PBwGcKB7Lc2f/dmb6bXZF\nY3DfUKbnCiVA8nwMS0hmocsv/9Hml5GB017wew0F5dCtObTziXXv41T8C14aKAsI\nW21dHcD6ZXgx4KeIvpaNZ0OFzVzd9oqZrrqOK7u4MJYJQYz+s8K64S2eWQKBgQCY\n4n3bdVWZLDqECY2PBnYORNkahH7AslgiioDpXX7Oe3Y38azIshNpW775jLRoOQDl\nE1YdAT0QRZa1xojaTgH94LEtbjwN7+nUE2zAX+d54PA98tEtCLlxC4OBYKLsAKYY\nzRW4M4ZJTp35eRSm4dDdcv9j3sGHXSGvTGdUjKYeSQKBgHZI28FvBe+vV2drN1Xn\ns3rVIXi4p6Q07gETTMuGaKPIvOamFBCE3XuY8hMjSp4xXw5TEKd2ebnouy4TAeCO\nsspvNhGAs501kqxICxS61zUcjNAg7WSfTSDBeIfAkfueJUB8cHEZ4ZCWqoh8N7/E\npcvKmS4ymcGNV6AdQchlX6FG\n-----END PRIVATE KEY-----\n',
        viewId: '239751759',
        startDate: `30daysAgo`,
        endDate: `today`,
        pageSize: 10000,
      },
    },

    {
      resolve: `gatsby-plugin-firebase-messaging`,
      options: {
        config: {
          apiKey: process.env.GATSBY_FIREBASE_API_KEY,
          appId: process.env.GATSBY_FIREBASE_APP_ID,
          messagingSenderId: process.env.GATSBY_FIREBASE_MESSENGING_SENDER_ID,
          projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
        },
      },
    },
    {
      resolve: 'gatsby-source-flamelink',
      options: {
        firebaseConfig: {
          projectId: 'hyblog',
          clientEmail: 'firebase-adminsdk-67h0r@hyblog.iam.gserviceaccount.com',
          privateKey:
            '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCt8tkO52oP8Ssg\nU9PprabpJ7mCZec582TSwM1X7gONZo+GRK6RWS4Af0THetEP/TLgS9K4X8vkR2gY\nKSIAAf7V9WzVgluxo1+MyplZMx3GCCLhOu5Z72wwugQxzPp80Mpoe1Yter6AAqFG\nKakYTQJ+Rr1X/IRnMmi3DSgPByrZ1Jd/mjj1XEtOARfhTokUyDym91W5ApACL3SL\nERhjZH9D9uv1bwql8CcM5cE19ctsVuWrOPAgcvEqW6/iSo7LXRVyLFI1EfwRGRVs\nz8YmGni9StqSaFRKH832mPg19f+IQbSO4czF2jTTx2E6sV47UDwDrQC/A8FExNA3\nLhH5WAfJAgMBAAECggEAFPoD/p3zNotHlJqXTlxAab3Ty1ZSQopH888H/vJhykj+\ncNt9I7kEk6RwB7rsqt1xUlwXxAqFXM4sTuboReZNCWyTHHz1ECBv/YX8ZSXavCQE\ntMg1sHHEyGwo5P/fix1l80tAUrQKdLHHKgi3GV+cDTH8U7fMwwxwqqEds2Y9Xs7m\nucV9u6YMCglieep/3145PPIDz0HzxT79UiRpCX585Px4CgIqWaSVoGOZA7VJEO4N\nr+LV0tJluUilIEVCit9HqDnM3Ep8gBhP8YV+0Aecsa0rGWVDlw3SjrTUNITjKuJc\nQmTBK9SAgospz9qufG99NWy7uoI3qlqDZ1EWobNwkwKBgQDyLH9fQmSgT5dvBiOk\nxFsU9FcAe/Z28y0RYisMJByvnzrqtCGFMBVXBaIoCpBvYRqSKo8xTKQNdT11SAM+\ndYAuMULUPL103c1CwepYX2lXwsVlyFz/A+kjiguTzdqnse2S184zhp99l6sYkIdF\nBvEZkXBNfOqK2vWF8/1yDwzOcwKBgQC34TOwh5XcABP3R0WA3o9JmJMrCfkAeNYs\n5hUc9Y4qN83j0RsxqxO439HGksP6jY5P6LYKzwdQpD79s+/RbKKIJ9eMqYv8FweE\ngAQ3q3VADgrAYSWep1PsRrSyjVVGlGNk/v3ufqtFynZw6qxpXEIDyjilcMb4BLrX\npKhwci/l0wKBgQClfZT5EtTS3DD+1LIs2WXoluSRVyTgumLU20HRhSf5N5W6Z6f0\nbRxYIGhkdnunMTNIKT87EEWXUMPTzocw+njCmDUz9eH958hp0zwCcgj5yQa9/ELY\nneKGv8ITmfvO1v8jdsfZXCjHWYq5OaLGn+zIbSPSQAfDJcfcZxSOCgzVUwKBgGnR\nhOCbNmez98l/T4U5DzaoQlErXQujfoW6Jv5SZezvzmHDjaXIsQHcdCmVfojq+7IK\n1vBjce87hjCUY3eez+4RF5+QVsnNKvtafJLY7hHdwtwxS+gAnXBExGpYoXGLpaOS\nhunAJap1ODIFKxE7EZaCwpSa0TYb6rZ8wJ5taBkXAoGASR0JixTZNGKiGxD51N6P\nnuCDj/vU3Gy+tSMlwx8xky+PAYrusTDsuBrh3hW+XC6uC5X8AT5ZtTT+ZFBWaVAn\nnq4IhhMMNkJ+ywGYVLsHwQRRgWdBgFCk2db0gu7Zr7LoYyHaWEVsMb0YfWUro9at\n0sv0rRQxNZQmi2qPiULkZ9Y=\n-----END PRIVATE KEY-----\n',
          databaseURL: 'https://hyblog-default-rtdb.firebaseio.com/',
          storageBucket: 'hyblog.appspot.com',
        },
        dbType: 'cf',
        environment: 'production',
        content: true,
        populate: true,
        navigation: true,
        globals: true,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `HyBlog - Official Hybra Blog`,
        short_name: `HyBlog`,
        description: `To Educate Enlighten and Empower each other for the betterment of society we must create conversations around the real issues.`,
        start_url: `/`,
        background_color: `#1489cc`,
        theme_color: `#1489cc`,
        display: `minimal-ui`,
        icon: `src/images/Hycon.png`,
      },
    },
    `gatsby-plugin-material-ui`,
  ],
}
