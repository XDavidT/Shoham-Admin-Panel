const express = require('express')
const logs_router = new express.Router()
const mongo_handler = require('../utilities/Logs/handler/LogsHandler')



logs_router.get('/logs',(req, res) =>{
    res.render('logs',{
        
    })
})

logs_router.get('/logs/data2table',(req, res) => {
    mongo_handler.getLogsFromDB(req.query,(error,result) =>{
        if(error){
            res.send(error)
        } else {
            console.log(result)
            res.jsonp(result)
        }
    })
})

module.exports = logs_router