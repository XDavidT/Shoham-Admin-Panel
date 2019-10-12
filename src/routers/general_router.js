const express = require('express')
const gen_router = new express.Router()
const mongo_handler = require('../utilities/handler/GeneralHandler')
const auth = require('./authentication')



gen_router.get('/setting' , (req, res) =>{
    res.render('setting',{
        
    })
})

gen_router.get('/api/setting/get-setting', (req, res) => {
    mongo_handler(req.body,(error,result) =>{
        if(error){
            res.send(error)
        } else {
            res.jsonp(result)
        }
    })
})

//TODO: add post req to update

module.exports = gen_router