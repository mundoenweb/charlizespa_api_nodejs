const express = require('express')
const router = express.Router()

const tratamentsRouter = require('../apiServices/trataments/tratamentsRouter')
const servicesRouter = require('../apiServices/services/servicesRouter')
const serveFileRouter = require('../apiServices/serveFiles/serveFilesRoutes')

router.use('/trataments', tratamentsRouter)
router.use('/services', servicesRouter)
router.use('/public', serveFileRouter)

module.exports = router
