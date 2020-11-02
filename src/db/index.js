import firebase from 'firebase'
import 'firebase/firestore'


export const firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREBASE,
    authDomain: 'product-crud-vue-781e8.firebaseapp.com',
    databaseURL: 'https://product-crud-vue-781e8.firebaseio.com',
    projectId: 'product-crud-vue-781e8',
    storageBucket: 'product-crud-vue-781e8.appspot.com',
    messagingSenderId: '861729157732',
    appId: '1:861729157732:web:a2f4269b68c31187d3a571',
    measurementId: 'G-51KE6KQVZW'
       };

const FirebaseApp = firebase.initializeApp(firebaseConfig)

export default FirebaseApp.firestore()
