const mongoose = require('mongoose')

// Coonect To: PolicyManager-DB
mongoose.connect('mongodb+srv://siem:iCDoqbyTT3xh@cluster0-ecrrx.gcp.mongodb.net/test?retryWrites=true&w=majority',{
    dbName: 'policyManager',
    useNewUrlParser: true ,
    useCreateIndex: true,
    useUnifiedTopology: true },(err)=>{
        if(err)
            console.log("Mongoose error connection in offense handler:  "+err)
    }
).then(()=>{
    console.log('Policy Manager connected')
})

