const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const conn = mongoose.createConnection('mongodb+srv://siem:iCDoqbyTT3xh@cluster0-ecrrx.gcp.mongodb.net/test?retryWrites=true&w=majority',{
    dbName: 'SystemManagment',
    useNewUrlParser: true ,
    useCreateIndex: true,
    useUnifiedTopology: true },(err)=>{
        if(err)
            console.log("Mongoose error connection in offense handler:  "+err)
    }
)

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
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
    role: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                if (v == 'admin' || v == 'user' )
                    return true
                else
                    return false
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    root:
    {
        type: String,
        required: false
    }
})



userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({_id: user._id.toString() }, 'PrivateToken' )
    
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) =>{
    const user = await User.findOne({ email })
    if(!user){
        throw new Error('Unable to login')  
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new Error('Unable to login')  
    }
    return user
}

//hashing plain-text password
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = conn.model('User', userSchema)

module.exports = exports = User