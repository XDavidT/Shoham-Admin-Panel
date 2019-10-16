const express = require('express')
const gen_router = new express.Router()
const mongo_handler = require('../utilities/handler/GeneralHandler')
const Authenticate = require('./Authentication')



gen_router.get('/setting' , (req, res) =>{
    res.render('setting',{
        
    })
})
gen_router.get('/setting3rd' , (req, res) =>{
    res.render('setting-third',{
        
    })
})

gen_router.get('/api/setting/get', (req, res) => {
    mongo_handler.getSettingFromDB(req.query,(error,result) =>{
        if(error){
            res.send(error)
        } else {
            res.jsonp(result)
        }
    })
})

gen_router.post('/api/setting/update',(req, res) => {
    mongo_handler.updateSetting(req.body,(error,result) =>{
        if(error){
            res.send(error)
        } else {
            res.sendStatus(result)
        }
    })
})

//TODO: add post req to update

module.exports = gen_router