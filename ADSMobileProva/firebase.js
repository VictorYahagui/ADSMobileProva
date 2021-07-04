import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: 'AIzaSyAEr0ujg-gAf65r6QYWKsi5gaPeZBuPWdA',
    authDomain: 'adsmobileprova.firebaseapp.com',
    databaseURL: 'https://adsmobileprova-default-rtdb.firebaseio.com',
    projectId: 'adsmobileprova',
    storageBucket: 'adsmobileprova.appspot.com',
    messagingSenderId: '844498868559',
    appId: '1:844498868559:web:bef8405e74aa03cc068d3a',
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const accountDB = firebaseApp.database().ref().child('account');
