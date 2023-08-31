const User = require('../mongo/models/userSchema')
const jwt = require('jsonwebtoken')

const userAuth = async (req, res, next) => {
    try{
        const token  = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token,"secretcode")
        // console.log("id:  ", decoded._id)
        const user = await User.findOne({_id : decoded._id})
        if(!user){
            return res.status(401).send({error:"Authentication error"})
        }
        req.user = user
        req.token = token
        next()
    }
    catch(err){
        res.status(401).send({error:"Please Authenticate"})
    }
}

module.exports = userAuth