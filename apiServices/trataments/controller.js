const createError = require('http-errors')
const { handlerMoveImage } = require('../../utils/handlerMoveImage')
const { handlerResponse } = require('../../utils/handlerResponse')
const {
  allTrataments,
  oneTratamentById,
  createTratament
} = require('./tratamentsModel')
const { handlerDataCreateTratament } = require('./utils/handlerData')

const getAllTrataments = (req, res, next) => {
  allTrataments()
    .then(trataments => {
      handlerResponse(res, trataments, 200)
    })
    .catch(err => {
      next(createError(500, err))
    })
}

const getAllTratamentsWeb = (req, res, next) => {
  allTrataments('web')
    .then(trataments => {
      handlerResponse(res, trataments, 200)
    })
    .catch(err => {
      next(createError(500, err))
    })
}
const getATratamentById = (req, res, next) => {

  const id = parseInt(req.params.id, 10)
  if (!id) next(createError(400, 'favor pase un id valido en la url'))

  oneTratamentById(id)
    .then(tratament => {
      handlerResponse(res, tratament, 200)
    })
    .catch(err => {
      next(createError(500, err))
    })
}

const postCreateTratament = async (req, res, next) => {
  let data = req.body
  const image = req.files?.image

  const errorData = await handlerDataCreateTratament(data, image)
  if(errorData) return next(createError(400, errorData))

  await handlerMoveImage(image, 'trataments')
  
  data.image = image.pathDB

  createTratament(data)
  .then(response => {
    const msg = 'tratamiento creado con exito'
    handlerResponse(res, response, 201, msg)
  })
  .catch(err => {
    next(createError(500, err))
  })
  
}

module.exports = {
  getAllTrataments,
  getAllTratamentsWeb,
  getATratamentById,
  postCreateTratament
}
