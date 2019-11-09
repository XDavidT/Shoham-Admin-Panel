
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
            req.flash('error','Unauthorized User')
            return res.redirect('back')
            }   
            next()
        }catch(e) {
            //no user is logged in 
            return res.redirect('http://localhost:3000/login')
        }
    }

module.exports = Authorize;