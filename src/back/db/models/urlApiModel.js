const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
let randomstring = require("randomstring")
const UrlSchema = new mongoose.Schema({
    value:'string',
    shortUrl:'string',
    countOfHits:{
        type:String,
        default:0,
    },
    tokens:[{
        token:{
            type:String,
            required: true
        }
    }],
    expireAt: { 
        type: Date,  
        expires: 2592000
    }
},
{
    timestamps: true
},)
UrlSchema.methods.generateAuthToken = async function () {
    const urlObject = this
    const token = jwt.sign({ _id: urlObject._id.toString() }, process.env.JWT_SECRET)
    urlObject.tokens = urlObject.tokens.concat({ token })
    return token
}
UrlSchema.methods.generateShortUrl = async function () {
    const urlObject = this
    const shortUrl = randomstring.generate(6)
    urlObject.shortUrl = shortUrl
    await urlObject.save()
    return shortUrl
}
const apiUrl = mongoose.model('apiUrl',UrlSchema)
module.exports = apiUrl