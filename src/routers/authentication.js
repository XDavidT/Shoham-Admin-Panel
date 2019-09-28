const User = require('../utilities/models/user_model')
const jwt = require('jsonwebtoken')

const authentication = async (req, res, next) => {
    console.log(req.header)
    try {   
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'PrivateToken')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = authentication