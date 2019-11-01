const mongoose = require('mongoose')

const conn = mongoose.createConnection('mongodb+srv://siem:iCDoqbyTT3xh@cluster0-ecrrx.gcp.mongodb.net/clientManager?retryWrites=true&w=majority',{
    dbName: 'clientManager',
    useNewUrlParser: true ,
    useCreateIndex: true,
    useUnifiedTopology: true },(err)=>{
        if(err)
            console.log("Mongoose error connection in offense handler:  "+err)
    }
)

const logSchema = new mongoose.Schema({
    logid:{
        type:String,
        required: true,
        trim: true
    },
    client_time:{
        type:Date,
        required: true,
        trim: true
    },
    insert_time:{
        type:Date,
        required: true,
        trim: true
    },
    type:{
        type:String,
        required: true,
        trim: true
    },
    src:{
        type:String,
        required: true,
        trim: true
    },
    cat:{
        type:String,
        required: true,
        trim: true
    },
    dataList:{
        type:Array,
        required: true,
        trim: true
    },
    hostname:{
        type:String,
        required: true,
        trim: true
    },
    username:{
        type:String,
        required: true,
        trim: true
    },
    os:{
        type:String,
        required: true,
        trim: true
    },
    ip_add:{
        type:String,
        required: true,
        trim: true
    },
    mac_add:{
        type:String,
        required: true,
        trim: true
    }
},{collection:'clientLog'})


const Log = conn.model('Log', logSchema)
module.exports = exports = Log