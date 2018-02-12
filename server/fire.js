const firebase = require('firebase');
const config = {
  apiKey: 'AIzaSyDQttoQWqyUPaC5VQmMV2mwniszVzDSdo0',
  authDomain: 'chesschain.firebaseapp.com',
  databaseURL: 'https://chesschain.firebaseio.com',
  projectId: 'chesschain',
  storageBucket: 'chesschain.appspot.com',
  messagingSenderId: '1098495793863'
};

const fire = firebase.initializeApp(config);
module.exports = fire;
