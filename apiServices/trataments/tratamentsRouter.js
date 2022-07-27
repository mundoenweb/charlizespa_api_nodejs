const express = require('express')
const router = express.Router()
const {
    getAllTrataments,
    getAllTratamentsWeb,
    getATratamentById,
    postCreateTratament,
    deleteTratament
} = require('./controller')

router.get('/', getAllTrataments)
router.get('/web', getAllTratamentsWeb)
router.get('/:id', getATratamentById)

router.post('/', postCreateTratament)
router.delete('/:id', deleteTratament)


module.exports = router
