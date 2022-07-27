const express = require('express')
const router = express.Router()

const tratamentsRouter = require('../apiServices/trataments/tratamentsRouter')
const servicesRouter = require('../apiServices/services/servicesRouter')

router.use('/trataments', tratamentsRouter)
router.use('/services', servicesRouter)

module.exports = router
