const User = require('../utilities/models/user_model')
const jwt = require('jsonwebtoken')

const Authenticate = async (req, res, next) => {
    try { 
        const token = req.cookies.token // requesting cookie from the user
        const decoded = jwt.verify(token, 'PrivateToken') // verify the cookie
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        next()
    } catch (e) {
       return res.redirect('/login') // redirecting to login page
    }
}

module.exports = Authenticate