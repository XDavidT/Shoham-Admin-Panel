const express = require('express')
const site_router = new express.Router()
const Authenticate = require('./authentication')
const Authorize = require('./authorization')


site_router.get('/login', (req, res) => {
    res.render('login',{
    })
})
site_router.get('/logs',  (req, res) =>{
    res.render('logs',{
    })
})
site_router.get('/policy',(req, res) =>{
    const messages = req.flash()
    res.render('policy',{messages})
})
site_router.get('/users', Authenticate, (req, res) => {
    const messages = req.flash()
    res.render('users',{messages})
})
site_router.get('/offenses',(req,res) => {
    res.render('offenses', {
    })
})
site_router.get('/setting' ,Authenticate, (req, res) =>{
    const messages = req.flash()
    res.render('setting',{messages})
})
site_router.get('/setting3rd' ,Authenticate, (req, res) =>{
    const messages = req.flash()
    res.render('setting-third',{messages})
})

module.exports = site_router