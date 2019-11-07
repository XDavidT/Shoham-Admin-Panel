const express = require('express')
const policy_handler = require('../utilities/handler/policyHandler')
require('../utilities/handler/policyHandler')
const Authenticate = require('./authentication')
const Authorize = require('./authorization')

const policy_router = new express.Router()

const bodyParser = require('body-parser')
policy_router.use(bodyParser.json()); 
policy_router.use(bodyParser.urlencoded({extended: false}))


policy_router.post('/postRules',Authorize, (req, res) => {
    policy_handler.postRulesToDB(req.body,(error,result) =>{
        if(error){
            res.send(error)
        } else {
            req.flash('success','New Rule Added')
            res.redirect('/policy')
        }
    })

})

policy_router.get('/data2table',(req, res) => {
    policy_handler.getRulessFromDB(req.query,(error,result) =>{
        if(error){
            res.send(error)
        } else {
            res.jsonp(result)
        }
    })
})

policy_router.post('/postEvents', (req, res) => {
    policy_handler.postEventsToDB(req.body,(error,result) =>{
        if(error){
            res.send(error)
        } else {
            req.flash('success','New Event Added')
            res.redirect('/policy')
        }
    })
})

policy_router.post('/editEvent',(req,res)=>{
    policy_handler.editEventDB(req.body,(error,result) =>{
        if(error){
            res.send(error)
        } else {
            req.flash('success','Event Edited')
            res.redirect('/policy')
        }
    })
})

policy_router.post('/deleteEvent',(req,res)=>{
    policy_handler.deleteEventDB(req.body,(error,result) =>{
        if(error){
            res.send(error)
        } else {
            req.flash('success','Event Deleted')
            res.redirect('/policy')
        }
    })
})


policy_router.post('/editRule', (req, res) => {
    policy_handler.editRules(req.body,(error,result) =>{
        if(error){
            res.send(error)
        } else {
            req.flash('success','New Event Added')
            res.redirect('/rules')
        }
    })

})

policy_router.post('/category_select',Authorize, (req, res) => {
    policy_handler.postCategoryToDB(req.body,(error,result) =>{
        if(error){
            res.send(error)
        } else {
            res.redirect('/policy')
        }
    })

})

policy_router.get('/eventData2table',(req, res) => {
    policy_handler.getEventsFromDB(req.query,(error,result) =>{
        if(error){
            res.send(error)
        } else {
            res.jsonp(result)
        }
    })
})

module.exports = policy_router