const express = require('express')
const gen_router = new express.Router()
const mongo_handler = require('../utilities/handler/GeneralHandler')
const Authorize = require('./authorization')
const isPortReachable = require('is-port-reachable')

gen_router.get('/get-setting', (req, res) => {
    mongo_handler.getSettingFromDB(req.query,(error,result) =>{
        if(error){
            res.send(error)
        } else {

            res.jsonp(result)
        }
    })
})

gen_router.post('/update-setting',Authorize,(req, res) => {
    mongo_handler.updateSetting(req.body,(error,result) =>{
        if(error){
            res.send(error)
        } else {
            req.flash('success','Setting Updated')
            res.redirect('/')
        }
    })
})

gen_router.get('/index-server-uptime',(req,res)=>{
    function format(seconds){
        function pad(s){
          return (s < 10 ? '0' : '') + s;
        }
        var hours = Math.floor(seconds / (60*60));
        var minutes = Math.floor(seconds % (60*60) / 60);
        var seconds = Math.floor(seconds % 60);
      
        return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
      }
      res.jsonp(format(process.uptime()))  
})

//Using in statics//
gen_router.get('/is-logger-alive',async (req,res)=>{
    const status = await isPortReachable(50051, {host:'siem.davidt.net'} )
    res.send(status)
})

module.exports = gen_router