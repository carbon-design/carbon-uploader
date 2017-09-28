﻿const ip = require('ip')
const chalk = require('chalk')
const multer = require('multer')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())

const Storage = multer.diskStorage({
  destination (req, file, callback) {
    callback(null, './files')
  },
  filename (req, file, callback) {
    // file.fieldname
    callback(null, Date.now() + '_' + file.originalname)
  }
})

// Field name and max count
const upload = multer({ storage: Storage }).array('imgUploader', 3)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
});

app.post('/api/Upload', (req, res) => {
  upload(req, res, err => {
    if (err) {
      return res.end('Something went wrong!')
    }
    return res.end('File uploaded sucessfully!.')
  })
})

const port = 2000
const uri = `http://${ip.address()}:${port}`

app.listen(2000, a => {
  console.log(chalk.green(`Server is running at ${uri}`))
});