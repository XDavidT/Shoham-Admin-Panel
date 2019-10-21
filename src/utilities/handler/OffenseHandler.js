const mongoose = require('mongoose')

// Coonect To: PolicyManager-DB
mongoose.connect('mongodb://mongo.davidt.net:27018/policyManager',{
    useNewUrlParser: true ,
    useCreateIndex: true,
    useUnifiedTopology: true },(err)=>{
        if(err)
            console.log("Mongoose error connection in offense handler:  "+err)
    }
).then(()=>{
    console.log('Policy Manager connected')
})

