'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const { resolve } = require('path')

const app = express()

module.exports = app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(require('morgan'))
  .use(express.static(resolve(__dirname, '..', 'public'))) // Serve static files from ../public
  // .use('/api', require('./api')) // Serve our api
  .get('/*', (_, res) => res.sendFile(resolve(__dirname, '..', 'public', 'index.html')));

if (module === require.main) {
  const PORT = 1993
  app.listen(PORT, () => console.log(`server listening on port ${PORT}`))
}
