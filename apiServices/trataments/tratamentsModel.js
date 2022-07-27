const connectDB = require('../../config/connectionDB')

const allTrataments = (web) => {
  return new Promise((resolve, reject) => {

    let sql = 'SELECT * FROM services'
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
        resolve([{id: result.insertId}])
      })
    })
  })
}

const deleteTratamentDB = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM services WHERE id=${id}`
    connectDB.query(sql, (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}

module.exports = {
  allTrataments,
  oneTratamentById,
  createTratament,
  deleteTratamentDB
}
