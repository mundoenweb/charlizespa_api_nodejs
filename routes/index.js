const express = require('express')
const router = express.Router()

const trataments = require('../apiServices/trataments/tratamentsRouter')

router.use('/trataments', trataments)

module.exports = router