const express = require('express')
const router = express.Router()
const { queryAllTrataments } = require('./controller')

router.get('/', queryAllTrataments)

module.exports = router