const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const shortUrlController = require('../controllers/shortUrl-controller')

router.post('/url', auth, (req, res)=>{
    shortUrlController.urlPage(req, res)
})

router.post('/shortUrl', (req, res)=>{
    shortUrlController.shortUrlPage(req, res)
})

module.exports = router