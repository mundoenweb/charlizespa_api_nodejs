const connectDB = require('../../config/connectionDB')

const modelegetAllServices = (web) => {
  return new Promise((resolve, reject) => {

    let sql = 'SELECT * FROM subservices'
    if (web) sql = 'SELECT * FROM services WHERE status = 1'

    connectDB.query(sql, (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}

const oneTratamentById = (id) => {
  const sql = `SELECT * FROM services WHERE id = ${id}`
  return new Promise((resolve, reject) => {
    connectDB.query(sql, (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}

const createTratament = (data) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO services SET ?, created_at = now()'
    connectDB.query(sql, data, (err, result) => {
      if (err) return reject(err)
      oneTratamentById(result.insertId)
        .then(res => {
          resolve(res)
        })
        .catch(() => {
          resolve([{ id: result.insertId }])
        })
    })
  })
}

const updateTratamentDB = (data, id) => {
  return new Promise(async (resolve, reject) => {

    const sql = `UPDATE services 
    SET ?, updated_at = now() 
    WHERE id=${id}`

    let pathImageOld = ''
    try {
      const tratament = await oneTratamentById(id)
      pathImageOld = tratament[0].image
    } catch { }

    connectDB.query(sql, data, (err, result) => {
      if (err) return reject(err)
      oneTratamentById(id)
        .then(res => {
          resolve({ res, pathImageOld })
        })
        .catch(() => {
          resolve([{ id: result.insertId }])
        })
    })
  })
}

const deleteTratamentDB = (id) => {
  return new Promise(async (resolve, reject) => {
    const sql = `DELETE FROM services WHERE id=${id}`

    const tratament = await oneTratamentById(id)
    connectDB.query(sql, (err, result) => {
      if (err) return reject(err)

      let pathImageOld = ''
      try {
        pathImageOld = tratament[0].image
      } catch (error) {

      }
      resolve(pathImageOld)
    })
  })
}

module.exports = {
  modelegetAllServices
}
