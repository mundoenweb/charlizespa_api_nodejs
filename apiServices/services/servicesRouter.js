const express = require('express')
const router = express.Router()
const {
  getAllServices
} = require('./servicesController')

router.get('/', getAllServices) // obtiene todos los servicios
router.get('/web') // obtiene todos los servicios menos los activos
router.get('/:id') //obtiene un servicio

router.put('/:id') // actualiza un servicio
router.post('/') // crea un servicio
router.delete('/:id') // elimina un servicio


module.exports = router
