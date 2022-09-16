const jwt = require('jsonwebtoken')
const apiUrl = require('../db/models/urlApiModel')

const auth = async (req, res, next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const apiUrlObject = await apiUrl.findOne({_id:decoded._id, 'tokens.token':token})
        if(!apiUrl){
            throw new Error()
        }
        req.apiUrlObject = apiUrlObject
        next()
    }catch(e){
        res.status(401).send({error:'Please authenticate.'})
    }
}
module.exports = auth