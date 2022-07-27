const express = require('express')
const router = express.Router()
const {
    getAllTrataments,
    getAllTratamentsWeb,
    getATratamentById,
    postCreateTratament
} = require('./controller')

router.get('/', getAllTrataments)
router.get('/web', getAllTratamentsWeb)
router.get('/:id', getATratamentById)

router.post('/', postCreateTratament)


module.exports = router
