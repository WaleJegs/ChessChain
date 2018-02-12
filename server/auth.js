const express = require('express');
const firebase = require('./fire');
const router = express.Router();

router.post('/signup', (req, res, next) => {

    firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password)
        .then((user) => {
            console.log(req.body)
            let plyr = {
                username: req.body.username,
                email: req.body.email,
                initialEther: req.body.ether
            }
            firebase.database().ref('users/' + user.V.R).set(plyr)
            res.json(plyr)
        })
        .catch((error) => {
            console.log('error', error.code, 'msg', error.message)
        })
})

router.post('/login', (req, res, next) => {
    firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
        .then((user) => {
            firebase.database().ref(`/users/${user.V.R}`).once('value')
                .then(snapshot => {
                    res.json(snapshot)
                })
        })
        .catch((error) => {
            console.log('error', error.code, 'msg', error.message)
        })
})


module.exports = router;