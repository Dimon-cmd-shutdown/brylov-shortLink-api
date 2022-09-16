const express = require('express')
const app = express()
require('./db/mongoose')
const path = require('path')
const shortUrlRouter = require('./routers/shortUrl-router')

app.use(express.json())
app.use(express.urlencoded())
app.use(shortUrlRouter)

module.exports = app