const createError = require('http-errors')
const { allServices } = require('./model')

const queryAllTrataments =  (req, res, next) => {
    
    allServices()

    .then(services => {
        res.status(200)
        res.json(services)
    })
    
    .catch(err => {
        next(createError(500, err))
    })
}

module.exports = {
    queryAllTrataments
}