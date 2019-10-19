const mongoose = require('mongoose')

mongoose.connect('mongodb://mongo.davidt.net:27018/clientManager',{
    useNewUrlParser: true ,
    useCreateIndex: true,
    useUnifiedTopology: true },
)