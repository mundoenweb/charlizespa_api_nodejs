const express = require('express')
const router = express.Router()
const {
    getAllTrataments,
    getAllTratamentsWeb,
    getATratamentById
} = require('./controller')

router.get('/', getAllTrataments)
router.get('/web', getAllTratamentsWeb)
router.get('/:id', getATratamentById)

router.post('/')


module.exports = router
