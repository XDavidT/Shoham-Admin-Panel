const express = require('express')
const logs_router = new express.Router()
const mongo_handler = require('../utilities/handler/LogsHandler')
const Authenticate = require('./authentication')
const Authorize = require('./authorization')




logs_router.get('/data2table', Authenticate, Authorize, (req, res) => {

    mongo_handler.getLogsFromDB(req.query,(error,result) =>{
        if(error){
            res.send(error)
        } else {
            res.jsonp(result)
        }
    })
})

module.exports = logs_router