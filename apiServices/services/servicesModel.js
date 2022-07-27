const connectDB = require('../../config/connectionDB')

const modelegetAllServices = (web) => {
  return new Promise((resolve, reject) => {

    let sql = 'SELECT * FROM subservices'
    if (web) sql = 'SELECT * FROM subservices WHERE status = 1'

    connectDB.query(sql, (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}

const modeleGetAService = (id) => {
  const sql = `SELECT * FROM subservices WHERE id = ${id}`
  return new Promise((resolve, reject) => {
    connectDB.query(sql, (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}

const modeleCreateService = (data) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO subservices SET ?, created_at = now()'
    connectDB.query(sql, data, (err, result) => {
      if (err) return reject(err)
      modeleGetAService(result.insertId)
        .then(res => {
          resolve(res)
        })
        .catch(() => {
          resolve([{ id: result.insertId }])
        })
    })
  })
}

const modeleUpdateService = (data, id) => {
  return new Promise(async (resolve, reject) => {

    const sql = `UPDATE subservices 
    SET ?, updated_at = now() 
    WHERE id=${id}`

    let pathImageOld = ''
    try {
      const service = await modeleGetAService(id)
      pathImageOld = service[0].image
    } catch { }

    connectDB.query(sql, data, (err, result) => {
      if (err) return reject(err)
      modeleGetAService(id)
        .then(response => {
          resolve({ response, pathImageOld })
        })
        .catch(() => {
          resolve([{ id: result.insertId, pathImageOld }])
        })
    })
  })
}

const modeleDeleteService = (id) => {
  return new Promise(async (resolve, reject) => {
    const sql = `DELETE FROM subservices WHERE id=${id}`

    const service = await modeleGetAService(id)
    connectDB.query(sql, (err, _) => {
      if (err) return reject(err)

      let pathImageOld = ''
      try {
        pathImageOld = service[0].image
      } catch {}
      
      resolve(pathImageOld)
    })
  })
}

module.exports = {
  modelegetAllServices,
  modeleGetAService,
  modeleCreateService,
  modeleUpdateService,
  modeleDeleteService
}
