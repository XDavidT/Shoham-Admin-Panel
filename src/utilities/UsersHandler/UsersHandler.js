const mongodb = require('mongodb')
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const mongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://13.68.170.154:27017'
const databaseName_Users = 'SystemManagment'
const usersName = 'Users'


////Get-Users-From-DB////
const getUsersFromDB = (myfilter_2,callback) => {
    mongoClient.connect(connectionURL,{useNewUrlParser: true},(error, user) => {
        if(error) {
            callback(error,undefined)
        }
        const userLogs = user.db(databaseName_Users).collection(usersName)
        userLogs.find(myfilter_2).toArray((error,userList) => {
            callback(undefined,userList)
        })
        //when finish - Close the connection!!
        user.close()
    })
}


////Send-Users-To-DB////
mongoose.connect('mongodb://13.68.170.154:27017/SystemManagment',{
    useNewUrlParser: true ,
    useCreateIndex: true
})
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

const me = new User(
    {
    name: 'sahar1' ,
    email: 'sahari6767@gmail.com' ,
    password: '1q2w3e4r' ,
    age: 26
   },
    
  
)

me.save().then(() => {
}) .catch((error) => {
})

/*userSchema.pre('save', async function(next) {
    const current_user = this
    
    console.log('just before saving!')
    next()
})

const sendUsersToDB = mongoose.model('User', userSchema)
*/




/// password-Hashing
const passwordHash_Func = async () => {
    const password = '1q2w3e4rr'
    const hashedPassword = await bcrypt.hash(password, 8)
    const isMatch = await bcrypt.compare('1q2w3e4rr', hashedPassword)
    console.log(isMatch)
}
passwordHash_Func()

module.exports = {
  getUsersFromDB: getUsersFromDB , //Get user-list from MongoDB
 // sendUsersToDB:  sendUsersToDB // Send user-list To MongoDB
}