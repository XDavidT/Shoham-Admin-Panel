const User = require('../utilities/models/user_model')
const jwt = require('jsonwebtoken')

const authentication = async (req, res, next) => {
    try {   
        const token = req.cookies.token
        if(!token)
            return res.status(401).send('No Token provided')
        const decoded = jwt.verify(token, 'PrivateToken')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = authentication