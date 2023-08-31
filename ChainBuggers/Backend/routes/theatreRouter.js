const express = require('express')
const bcrypt = require('bcryptjs')
const Theatre = require('../mongo/models/theatreSchema')
const theatreAuth = require('../middlewares/theatreAuth')


const router = new express.Router()

router.post('/signup', async(req, res)=>{
    let existanceMail
    let existancePhone
    let existanceGst

    if(req.body.email){
        existanceMail = await Theatre.findOne({email:req.body.email})
    }
    if(req.body.phone){
        existancePhone = await Theatre.findOne({phone:req.body.phone})
    }
    if(req.body.gst){
        existanceGst = await Theatre.findOne({gst_no:req.body.gst_no})
    }

    if(existanceMail || existancePhone || existanceGst){
        return res.send("Email, Phone number or GST number already registered")
    }

    try {
        const theatre = new Theatre(req.body)
        await theatre.generateAuthToken()
        bcrypt.hash(theatre.password, 8, async function(err, hash) {
            theatre.password = hash
            await theatre.save()
            res.send({ theatre })
        });
    } catch (e) {
        console.log(e)
        if(e.code = 11000){
            return res.status(400).send("Theatre already registered")
        }
        res.status(500).send(e)
    }
})

router.post('/login', async (req, res) => {
    const email = req.body.email
    const phone = req.body.phone
    
    const theatre = req.body.email ? await Theatre.findOne({ email }) : await Theatre.findOne({ phone })
    if (!theatre) {
        res.status(404).send("Wrong credentials")
    }
    else {
        const isMatch = await bcrypt.compare(req.body.password, theatre.password)
        console.log("check",isMatch)
        if (isMatch) {
            await theatre.generateAuthToken()
            await theatre.save()
            console.log(theatre)
            res.send({ theatre })
        }
        else {
            res.status(404).send("Wrong credentials")
        }
    }
})

router.get('/test', theatreAuth, async(req,res)=>{
    res.send("Theatre authenticated")
})


module.exports = router