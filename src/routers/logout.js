const User = require('../utilities/models/user_model')
const jwt = require('jsonwebtoken')

const logout = async (req, res,next) => {
    try{
        const token = req.cookies.token
        console.log(token)
        const decoded = jwt.verify(token, 'PrivateToken') // verify the cookie
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        console.log("-----------------")
        console.log(user)
        const user_token = user.tokens.filter((token)=>{
            console.log("-----------------")
            console.log(token.token)
            delete token.token
        })
        
        console.log('logout success')
        await req.user.save()
        next()
        } catch (e) {
            console.log('logout failed')
            return res.redirect('/login') // redirecting to login page
        }
    }

module.exports = logout