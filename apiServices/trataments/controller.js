const createError = require('http-errors')
const { handlerResponse } = require('../../utils/handlerResponse')
const {
  allTrataments,
  oneTratamentById
} = require('./tratamentsModel')

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

const postCreateTratament = (req, res, next) => {
  
}

module.exports = {
  getAllTrataments,
  getAllTratamentsWeb,
  getATratamentById
}
