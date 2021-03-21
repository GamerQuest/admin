import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import React, { PropsWithChildren } from 'react'
import { FirebaseAppProvider, SuspenseWithPerf } from 'reactfire'

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
}

const fireApp = firebase.initializeApp(config)

export const firestore = fireApp.firestore()
export const auth = fireApp.auth()
export const cloud = fireApp.storage()

interface FirebaseDocumentMeta {
  createdAt?: firebase.firestore.FieldValue
  updatedAt: firebase.firestore.FieldValue
}

export const buildFirebaseDocumentMeta = (): FirebaseDocumentMeta => ({
  createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
})

export const updateFirebaseDocumentMeta = (): FirebaseDocumentMeta => ({
  updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
})

function FirebaseProvider({ children }: PropsWithChildren<any>) {
  return (
    <FirebaseAppProvider firebaseApp={ fireApp }>
      <SuspenseWithPerf traceId="app-load" fallback="">
        { children }
      </SuspenseWithPerf>
    </FirebaseAppProvider>
  )
}

export default FirebaseProvider
