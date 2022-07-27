const fs = require('fs')
const path = require('path')

module.exports.handlerDeleteFile = (pathFile) => {
  const cd = path.join(__dirname, '../')
  if (fs.existsSync(`${cd}${pathFile}`)) {
    fs.unlinkSync(`${cd}${pathFile}`)
  }
}
