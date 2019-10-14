const User = require('../utilities/models/user_model')
const jwt = require('jsonwebtoken')

//Need to complete
const Authorize = async(req,res,next) => {
    try{
        const token = req.cookies.token // requesting cookie from the user
        const decoded = jwt.verify(token, 'PrivateToken') // verify the cookie
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        if( !user || user.role !== 'admin'  ){
            // user's role is not authorized
            return res.status(401).json({ message: 'Unauthorized->Not admin' })
            }   
            next()
        }catch(e) {
            return res.send('Unauthorized->Not loggin').status(401)
        }
    }

module.exports = Authorize;