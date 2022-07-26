const connectDB = require('../../config/connectionDB')

const allServices = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM services'
        connectDB.query(sql, (err, result) => {
            if (err) return reject(err)
            resolve(result)
        })
    })
}

module.exports = {
    allServices
}