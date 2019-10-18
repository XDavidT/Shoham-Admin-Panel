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
    res.render('users',{
    })
})
site_router.get('/offenses',(req,res) => {
    res.render('offenses', {
    })
})
site_router.get('/setting' , (req, res) =>{
    res.render('setting',{
        
    })
})
site_router.get('/setting3rd' , (req, res) =>{
    res.render('setting-third',{
        
    })
})

module.exports = site_router