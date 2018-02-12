'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const volleyball = require('volleyball')

const app = express()

app.use(volleyball);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '/public')))

// app.use('/api', require('./server/api'));

app.get('*', function(req, res, next) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.use(function(err, req, res, next) {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});

const PORT = 1993
app.listen(PORT, () => console.log(`server listening on port ${PORT}`))