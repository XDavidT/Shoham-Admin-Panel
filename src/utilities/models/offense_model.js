const mongoose = require('mongoose')
var ObjectId = require('mongodb').ObjectID

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

const Offense = mongoose.model('Offense',offenseSchema)

module.exports = Offense