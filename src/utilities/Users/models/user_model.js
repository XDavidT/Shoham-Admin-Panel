const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a postive number')
            }
        }
    }
})

/*const passwordHash_Func = async () => {
    const password = '1q2w3e4rr'
    const hashedPassword = await bcrypt.hash(password, 8)
    const isMatch = await bcrypt.compare('1q2w3e4rr', hashedPassword)
}
passwordHash_Func()
*/
module.exports = User