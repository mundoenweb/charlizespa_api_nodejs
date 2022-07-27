require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const path = require('path')
const createError = require('http-errors')
const connectionDB = require('./config/connectionDB')

const app = express()
const routes = require('./routes/index')
const { error404, handlerErrors } = require('./middleware/errors')

// middlewares
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(fileUpload())
// app.use(express.static(path.join(__dirname, 'public')));

app.use(routes)
app.use(error404)
app.use(handlerErrors)

module.exports = app
