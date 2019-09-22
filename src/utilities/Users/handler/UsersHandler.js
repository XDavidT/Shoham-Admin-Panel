const mongoose = require('mongoose')


////CoonectTo-Users-DB////1
mongoose.connect('mongodb://localhost:27017/SystemManagment',{
    useNewUrlParser: true ,
    useCreateIndex: true,
    useUnifiedTopology: true
})
