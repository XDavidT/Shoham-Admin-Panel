const mongoose = require('mongoose')
var ObjectId = require('mongodb').ObjectID

const conn = mongoose.createConnection('mongodb+srv://siem:iCDoqbyTT3xh@cluster0-ecrrx.gcp.mongodb.net/policyManager?retryWrites=true&w=majority',{
    dbName: 'policyManager',
    useNewUrlParser: true ,
    useCreateIndex: true,
    useUnifiedTopology: true },(err)=>{
        if(err)
            console.log("Mongoose error connection in offense handler:  "+err)
    }
)

// Same as need to be in DB
const offenseSchema = new mongoose.Schema({
    id:ObjectId,
    event:String,
    type:String,
    offense_close_time:Date,
    device:[{
        type:String
    }],
    logs:[{
        id:ObjectId,
        logid:String,
        client_time:Date,
        insert_time:Date,
        type:String,
        src:String,
        cat:String,
        hostname:String,
        username:String,
        os:String,
        ip_add:String,
        mac_add:String,
        dataList:[{type:String}]
    }]
},{collection:'success-alert'})

const Offense = conn.model('Offense',offenseSchema)

module.exports = exports = Offense