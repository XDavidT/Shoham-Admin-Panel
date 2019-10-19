const mongoose = require('mongoose')

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


const Log = mongoose.model('Log', logSchema)
module.exports = Log