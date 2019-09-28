const expressJwt = require('express-jwt');
const { secret } = require('config.json');
const User = require('../utilities/models/user_model')


//Getting Authorized
const authorize = async(req,res,next) => {
    const role = req.body.role
     const email = req.body.email
     const user = await User.findOne({ email , 'role': role})
     if(!user){
            // user's role is not authorized
            return res.status(401).json({ message: 'Unauthorized' })
        }

       next();
    }

module.exports = authorize;