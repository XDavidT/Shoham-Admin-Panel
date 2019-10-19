const express = require('express')
require('../utilities/handler/LogsHandler')
const LogsModel = require('../utilities/models/logs_model')
const logs_router = new express.Router
const Authenticate = require('./authentication')
const Authorize = require('./authorization')

logs_router.post('/loadata',(req,res)=>{
    // const searchValue = req.body['search']['value']
    try{
        LogsModel.find({}).limit(Number(req.body['length'])).skip(Number(req.body['start'])).maxTimeMS(10000).lean().exec((err,logs)=>{
            LogsModel.countDocuments().exec((err,count)=>{
                const resJson = {}
                resJson['data'] = logs
                resJson['recordsTotal'] = count
                resJson['recordsFiltered'] = count
                resJson['error'] = err
                res.jsonp(resJson)
            })
        })
    }
    catch (err){
        console.log(err)
    }
})


module.exports = logs_router