const express = require('express')
const router = express.Router()
const path = require('path')

const urlRaiz = path.join(__dirname, '../../')

router.get('/*:file', function (req, res) {
  const pathFile = `/public/${req.url}`
    res.sendFile(urlRaiz + pathFile)
})


module.exports = router
