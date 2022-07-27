const createError = require('http-errors')
const { handlerDeleteFile } = require('../../utils/handlerDeleteFile')
const { handlerMoveImage } = require('../../utils/handlerMoveImage')
const { handlerResponse } = require('../../utils/handlerResponse')
const {
  modelegetAllServices
} = require('./servicesModel')

const getAllServices = (req, res, next) => {
  modelegetAllServices()
    .then(trataments => {
      handlerResponse(res, trataments, 200)
    })
    .catch(err => {
      next(createError(500, err))
    })
}

module.exports = {
  getAllServices
}
