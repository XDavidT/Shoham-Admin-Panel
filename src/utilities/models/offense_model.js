const mongoose = require('mongoose')

// Same as need to be in DB
const offenseSchema = new mongoose.Schema({
    _id:{
        type: ObjectId,
        required: true,
        trim: true,
        unique: true
    },
    event:String,
    type:String,
    offense_close_time:Date,
    device:[{
        type:String
    }],
    logs:[{
        _id:ObjectId,
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
})

