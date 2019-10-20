const mongoose = require('mongoose')

// Coonect To: PolicyManager-DB
mongoose.connect('mongodb://mongo.davidt.net:27018/policyManager',{
    useNewUrlParser: true ,
    useCreateIndex: true,
    useUnifiedTopology: true }
)

