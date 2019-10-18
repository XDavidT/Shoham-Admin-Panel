const express = require('express')
const auth_router = express.Router()
const User = require('../utilities/models/user_model')
const jwt = require('jsonwebtoken')

//Need to complete
const Authorize = auth_router.use( async(req,res,next) => {
    try{
        console.log("0")
        const messages = req.flash()
        console.log(messages)
        console.log("1")
        console.log(User.role)
        const token = req.cookies.token // requesting cookie from the user
        const decoded = jwt.verify(token, 'PrivateToken') // verify the cookie
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        console.log(user.role)
        if( !user || user.role !== 'admin'  ){
            // user's role is not authorized
            console.log("2")
            req.flash('error','Read only user')
            console.log("3")
            //return res.status(401).json({ message: 'Unauthorized->Not admin' })
            }   
            next()
        }catch(e) {
            return res.send('Unauthorized->Not loggin').status(401)
        }
    })

module.exports = Authorize;