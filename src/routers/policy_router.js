const express = require('express')
const policy_handler = require('../utilities/handler/policyHandler')
require('../utilities/handler/policyHandler')
const policy_router = new express.Router()

const bodyParser = require('body-parser')
policy_router.use(bodyParser.json()); 
policy_router.use(bodyParser.urlencoded({extended: false}))




policy_router.get('/policy',(req, res) =>{
    res.render('policy',{
    })
})


policy_router.post('/api/policy/postRules', (req, res) => {
console.log(req.body)
    policy_handler.postRulesToDB(req.body,(error,result) =>{
        if(error){
            res.send(error)
        } else {
            res.redirect('/policy')
        }
    })

})

policy_router.get('/api/policy/data2table',(req, res) => {
    policy_handler.getRulessFromDB(req.query,(error,result) =>{
        if(error){
            res.send(error)
        } else {
            res.jsonp(result)
        }
    })
})

policy_router.post('/api/policy/postEvents', (req, res) => {
    policy_handler.postEventsToDB(req.body,(error,result) =>{
        if(error){
            res.send(error)
        } else {
            res.redirect('/policy')
        }
    })

})

policy_router.post('/policy/category_select', (req, res) => {
    policy_handler.postCategoryToDB(req.body,(error,result) =>{
        if(error){
            res.send(error)
        } else {
            res.redirect('/policy')
        }
    })

})

policy_router.get('/api/policy/eventData2table',(req, res) => {
    policy_handler.getEventsFromDB(req.query,(error,result) =>{
        if(error){
            res.send(error)
        } else {
            res.jsonp(result)
        }
    })
})

module.exports = policy_router