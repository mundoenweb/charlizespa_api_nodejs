const handlerDataCreateTratament = (data, image) => {
  return new Promise((resolve, _) => {

    if (!Object.entries(data).length) {
      return resolve('objeto vacio')
    }

    if (!data.name) {
      return resolve('Favor pase un nombre para el tratamiento')
    }

    if(!image) {
      return resolve('Favor enviar imágen')
    }

    return resolve(null)
  })
}

module.exports = {
  handlerDataCreateTratament
}
