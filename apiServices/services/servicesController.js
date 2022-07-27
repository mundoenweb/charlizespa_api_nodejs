const createError = require('http-errors')
const { handlerDeleteFile } = require('../../utils/handlerDeleteFile')
const { handlerMoveImage } = require('../../utils/handlerMoveImage')
const { handlerResponse } = require('../../utils/handlerResponse')
const {
  modelegetAllServices, modeleGetAService, modeleCreateService, modeleUpdateService
} = require('./servicesModel')
const { handlerDataCreateService, handlerDataUpdateService } = require('./utils/handlerData')

const getAllServices = (req, res, next) => {
  modelegetAllServices()
    .then(services => {
      handlerResponse(res, services, 200)
    })
    .catch(err => {
      next(createError(500, err))
    })
}

const getAllServicesWeb = (req, res, next) => {
  modelegetAllServices('web')
    .then(trataments => {
      handlerResponse(res, trataments, 200)
    })
    .catch(err => {
      next(createError(500, err))
    })
}

const getAService = (req, res, next) => {

  const id = parseInt(req.params.id, 10)
  if (!id) return next(createError(400, 'favor pase un id valido en la url'))

  modeleGetAService(id)
    .then(service => {
      handlerResponse(res, service, 200)
    })
    .catch(err => {
      next(createError(500, err))
    })
}

const createService = async (req, res, next) => {
  let data = req.body
  const image = req.files?.image

  const errorData = await handlerDataCreateService(data, image)
  if(errorData) return next(createError(400, errorData))

  await handlerMoveImage(image, 'services')
  
  data.image = image.pathDB

  modeleCreateService(data)
  .then(response => {
    const msg = 'servicio creado con exito'
    handlerResponse(res, response, 201, msg)
  })
  .catch(err => {
    next(createError(500, err))
  })
  
}

const updateService = async (req, res, next) => {
  const id = parseInt(req.params.id, 10)
  let data = req.body
  const image = req.files?.image

  console.log(data)

  const errorData = await handlerDataUpdateService(data)
  if(errorData && !image) return next(createError(400, errorData))
  if (!id) return next(createError(400, 'favor pase un id valido en la url'))

  if (image) {
    await handlerMoveImage(image, 'services')
    data.image = image.pathDB
  }
  
  modeleUpdateService(data, id)
  .then(({response, pathImageOld}) => {
    const msg = 'servicio actualizado con exito'
    handlerDeleteFile(pathImageOld)
    handlerResponse(res, response, 200, msg)
  })
  .catch(err => {
    next(createError(500, err))
  })
  
}

module.exports = {
  getAllServices,
  getAllServicesWeb,
  getAService,
  createService,
  updateService
}
