const express = require('express')
const site_router = new express.Router()
const Authenticate = require('./Authentication')
const Authorize = require('./Authorization')


app.get('/login', (req, res) => {
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
module.exports = site_router