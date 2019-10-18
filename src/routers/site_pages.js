const express = require('express')
const site_router = new express.Router()
const Authenticate = require('./Authentication')
const Authorize = require('./Authorization')


site_router.get('/login', (req, res) => {
    res.render('login',{
    })
})
site_router.get('/logs', Authenticate , Authorize, (req, res) =>{
    res.render('logs',{
    })
})
site_router.get('/policy',(req, res) =>{
    res.render('policy',{
    })
})
site_router.get('/users', Authenticate, (req, res) => {
    const messages = req.flash()
    console.log(messages)
    res.render('users',
        {messages}
    )
})
site_router.get('/offenses',(req,res) => {
    res.render('offenses', {
    })
})

module.exports = site_router