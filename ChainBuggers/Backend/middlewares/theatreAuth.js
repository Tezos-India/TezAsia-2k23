const Theatre = require('../mongo/models/theatreSchema')
const jwt = require('jsonwebtoken')

const theatreAuth = async (req, res, next) => {
    try{
        const token  = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token,"secretcode")
        const theatre = await Theatre.findOne({_id : decoded._id})
        if(!theatre){
            return res.status(401).send({error:"Authentication error"})
        }
        req.theatre = theatre
        req.token = token
        next()
    }
    catch(err){
        res.status(401).send({error:"Please Authenticate"})
    }
}

module.exports = theatreAuth