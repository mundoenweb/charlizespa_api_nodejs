require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const path = require('path')
const createError = require('http-errors')
const connectionDB = require('./config/connectionDB')

const app = express()
const routes = require('./routes/index')
const { error404, handlerErrors } = require('./middleware/errors')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// app.use(express.static(path.join(__dirname, 'public')));

app.use(routes)
app.use(error404)
app.use(handlerErrors)

module.exports = app
