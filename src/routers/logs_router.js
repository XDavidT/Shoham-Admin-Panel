const express = require('express')
const logs_router = new express.Router()
const mongo_handler = require('../utilities/handler/LogsHandler')
const auth = require('./authentication')



logs_router.get('/logs', auth , (req, res) =>{
    res.render('logs',{
        
    })
})

logs_router.get('/api/logs/data2table', auth, (req, res) => {

    mongo_handler.getLogsFromDB(req.query,(error,result) =>{
        if(error){
            res.send(error)
        } else {
            res.jsonp(result)
        }
    })
})

module.exports = logs_router