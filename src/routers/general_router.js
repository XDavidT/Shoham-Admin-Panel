const express = require('express')
const gen_router = new express.Router()
const mongo_handler = require('../utilities/handler/GeneralHandler')
const Authenticate = require('./Authentication')

gen_router.get('/get', (req, res) => {
    mongo_handler.getSettingFromDB(req.query,(error,result) =>{
        if(error){
            res.send(error)
        } else {
            res.jsonp(result)
        }
    })
})

gen_router.post('/update',(req, res) => {
    mongo_handler.updateSetting(req.body,(error,result) =>{
        if(error){
            res.send(error)
        } else {
            res.sendStatus(result)
        }
    })
})

module.exports = gen_router