const express = require('express')
const router = express.Router()
const {
  getAllServices, getAllServicesWeb
} = require('./servicesController')

router.get('/', getAllServices) // obtiene todos los servicios
router.get('/web', getAllServicesWeb) // obtiene todos los servicios menos los activos
router.get('/:id') //obtiene un servicio

router.put('/:id') // actualiza un servicio
router.post('/') // crea un servicio
router.delete('/:id') // elimina un servicio


module.exports = router
