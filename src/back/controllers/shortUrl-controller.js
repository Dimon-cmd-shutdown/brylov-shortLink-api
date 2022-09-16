const path = require('path')
const isValidUrl = require('valid-url')
const apiUrl = require('../db/models/urlApiModel')

const shortUrlPage = async (req, res)=>{
    try{
        const url = req.body.url
        if(isValidUrl.isUri(url)) {
            const createdUrlObject = await apiUrl.create({ value: url });
            const token = await createdUrlObject.generateAuthToken()
            const shortUrl = await createdUrlObject.generateShortUrl()
            return res.send(shortUrl)
        }
        throw new Error()
        
    }catch(e){
        res.send('Not valid url')
    }
}

const urlPage = async (req, res)=>{
    try{
        const shortUrl = req.body.shortUrl
        if(shortUrl.length === 6 && req.apiUrlObject.shortUrl === shortUrl) {
            req.apiUrlObject.countOfHits++
            await req.apiUrlObject.save()
            return res.send(req.apiUrlObject.value)
        }
        throw new Error()
        
    }catch(e){
        res.send('Not valid short url')
    }
}


module.exports = {
    name:'shortUrlController',
    shortUrlPage,
    urlPage
}