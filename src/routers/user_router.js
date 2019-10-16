const express = require('express')
const User = require('../utilities/models/user_model')
require('../utilities/handler/UsersHandler')
const Authenticate = require('./Authentication')
const Authorize = require('./Authorization')
const logout = require('./logout')
const user_router = new express.Router()



//getting Authenticated User from DB
user_router.get('/users/me', Authenticate, async (req , res) => {
       res.send(req.user)
})

user_router.get('/users', Authenticate, (req, res) => {
    res.render('users',{
        
    })
})


//getting Users from DB and be Authorized!
user_router.get('/users/data2table', Authenticate , async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send()
    }
})

//getting one User from DB
user_router.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

//Updating User to DB
user_router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const user = await User.findByIdAndUpdate({_id: req.params.id}, req.body).then(function() {            
            User.findOne({_id: req.param.id}).then(function(user) {
            })
        })
        console.log(user)
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

//Creating User to DB
user_router.post('/users/add', Authorize, async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.redirect('/users')
    } catch (e) {
        res.status(400).send(e)
    }
})

//Login User 
user_router.post('/users/login', async (req, res) => {
    try{
    const user = await User.findByCredentials(req.body.email , req.body.password)
    const token = await user.generateAuthToken()
    res.cookie('token',token,{'maxAge': 3600000, httpOnly: true}) // sending cookie with expire time of 1 Hour.
    res.redirect(302 , 'http://localhost:3000')
    console.log("Login Succes")
    } catch(error){
        console.log("Login Error")
        res.status(400).send('Login error')
    }
})

//Logout User
user_router.post('/users/logout', Authenticate, logout, async (req, res) => {
    try {
        await req.user.save()
    } catch (e) {
        res.status(500).send()
    }
})

//Logout All-Users
user_router.post('/users/logoutAll', Authenticate, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

//deleting User from DB
user_router.delete('/users/delete', async (req, res) => {
        try{
         const user = await User.findByIdAndDelete(req.param.id).then(function() {
                            User.findOneAndDelete(req.param.id).then(function(user) {
                            })
                        })
        if (!user) {
            return res.status(404).send()
        }                    

        res.send(user)
    }   catch (error) {
        res.status(505).send()
    }
})

//deleting All documents from DB
user_router.delete('/users' , async (req, res) => { 
    try{
    const user = await User.remove({}, function(err,removed) {
        res.status(200).send('Delete success')
    })
        if (!user) {
            return res.status(404).send('There are no documents')
        }

    }catch(error)
{
    res.status(404).send('There are no documents')
}
})


module.exports = user_router
