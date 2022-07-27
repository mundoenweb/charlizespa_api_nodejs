const handlerDataCreateService = (data, image) => {
  return new Promise((resolve, _) => {

    if (!Object.entries(data).length) {
      return resolve('no puede crear un servicio sin datos')
    }

    if (!data.name) {
      return resolve('Favor pase un nombre para el servicio')
    }

    if (!data.partialPrice) {
      return resolve('Favor pase el monto del precio parcial')
    }

    if (!data.price) {
      return resolve('Favor pase un costo de servicio')
    }

    if (!data.idService) {
      return resolve('es necesario el id del tratamiento o servicio principal')
    }

    if(!image) {
      return resolve('es necesario una imagen imágen')
    }

    return resolve(null)
  })
}

const handlerDataUpdateService = (data) => {
  return new Promise((resolve, _) => {

    if (!Object.entries(data).length) {
      return resolve('favor envie los datos a actualizar')
    }

    return resolve(null)
  })
}

module.exports = {
  handlerDataCreateService,
  handlerDataUpdateService
}
