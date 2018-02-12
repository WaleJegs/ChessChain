const express = require('express');
const firebase = require('./fire');
const router = express.Router();

router.post('/signup', (req, res, next) => {

    firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password)
        .then((user) => {
            console.log(req.body)
            firebase.database().ref('users/' + user.V.R).set({
                username: req.body.username,
                email: req.body.email,
                initialEther: req.body.ether
            })
            res.sendStatus(201)
        })
        .catch((error) => {
            console.log('error', error.code, 'msg', error.message)
        })
})

router.post('/login', (req, res, next) => {
    firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
        .then((user) => {
            console.log(user)
            res.status(201).send(`${user.name} signed in!`);
        })
        .catch((error) => {
            console.log('error', error.code, 'msg', error.message)
        })
})


module.exports = router;