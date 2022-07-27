const createError = require('http-errors')
const { handlerDeleteFile } = require('../../utils/handlerDeleteFile')
const { handlerMoveImage } = require('../../utils/handlerMoveImage')
const { handlerResponse } = require('../../utils/handlerResponse')
const {
  allTrataments,
  oneTratamentById,
  createTratament,
  deleteTratamentDB,
  updateTratamentDB
} = require('./tratamentsModel')
const { handlerDataCreateTratament, handlerDataUpdateTratament } = require('./utils/handlerData')

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
  if (!id) return next(createError(400, 'favor pase un id valido en la url'))

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

const updateTratament = async (req, res, next) => {
  const id = parseInt(req.params.id, 10)
  let data = req.body
  const image = req.files?.image

  const errorData = await handlerDataUpdateTratament(data)
  if(errorData && !image) return next(createError(400, errorData))
  if (!id) return next(createError(400, 'favor pase un id valido en la url'))

  if (image) {
    await handlerMoveImage(image, 'trataments')
    data.image = image.pathDB
  }
  
  updateTratamentDB(data, id)
  .then(({ response, pathImageOld }) => {
    const msg = 'tratamiento actualizado con exito'
    handlerDeleteFile(pathImageOld)
    handlerResponse(res, response, 200, msg)
  })
  .catch(err => {
    next(createError(500, err))
  })
  
}

const deleteTratament = (req, res, next) => {
  const id = parseInt(req.params.id, 10)
  if (!id) return next(createError(400, 'favor pase un id valido en la url'))

  deleteTratamentDB(id)
  .then((pathImageOld)=> {
    const msg = 'tratamiento eliminado correctamente'

    handlerDeleteFile(pathImageOld)
    handlerResponse(res, null, 200, msg)
  })
  .catch(() => {
    next(createError(500, 'error al eliminar el tratamiento'))
  })
}

module.exports = {
  getAllTrataments,
  getAllTratamentsWeb,
  getATratamentById,
  postCreateTratament,
  updateTratament,
  deleteTratament
}
