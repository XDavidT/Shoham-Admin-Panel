const mongodb = require('mongodb')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const mongoClient = mongodb.MongoClient


////CoonectTo-Users-DB////
mongoose.connect('mongodb://13.68.170.154:27017/SystemManagment',{
    useNewUrlParser: true ,
    useCreateIndex: true,
    useUnifiedTopology: true
})
