const mongoose = require('mongoose')


////CoonectTo-Users-DB////1
mongoose.connect('mongodb://mongo.davidt.net:27018/SystemManagment',{
    useNewUrlParser: true ,
    useCreateIndex: true,
    useUnifiedTopology: true
})
