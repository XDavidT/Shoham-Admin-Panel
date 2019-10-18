const User = require('../utilities/models/user_model')
const jwt = require('jsonwebtoken')

const logout = async (req, res,next) => {
    try{
        const token = req.cookies.token
        const decoded = jwt.verify(token, 'PrivateToken') // verify the cookie
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
         user.tokens = []
        await user.save()
        res.cookie('token',token,{'maxAge': 0 , httpOnly: true})
        console.log('logout success')
        res.redirect(302 , 'http://localhost:3000/login')
        next()
        } catch (e) {
            console.log('logout failed')
            return res.redirect('/login') // redirecting to login page
        }
    }

module.exports = logout