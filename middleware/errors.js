const createError = require('http-errors')

const error404 = (req, res, next) => {
    next(createError(404, 'pagina no encontrada'))
}

const handlerErrors = (err, req, res, next) => {
    // establecer locales, solo proporcionando error en el desarrollo
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    res.status(err.status || 500)
    res.json(err)
}

module.exports = {
    error404,
    handlerErrors
}