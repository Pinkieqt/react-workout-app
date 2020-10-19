import React from 'react';
import ReactDOM from 'react-dom';
import './tailwind.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const firebase = require('firebase');
require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyBGKwLs1GcGuGsMDMc6e5ObLLMWvgw17xQ",
  authDomain: "izworkout.firebaseapp.com",
  databaseURL: "https://izworkout.firebaseio.com",
  projectId: "izworkout",
  storageBucket: "izworkout.appspot.com",
  messagingSenderId: "335358269966",
  appId: "1:335358269966:web:c4b24ee7f4a06282c03a5f",
  measurementId: "G-YD6W17VTRN"
};
firebase.initializeApp(firebaseConfig);
firebase.auth()

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
