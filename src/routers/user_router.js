const express = require('express')
const User = require('../utilities/models/user_model')
require('../utilities/handler/UsersHandler')
const Authenticate = require('./authentication')
const Authorize = require('./authorization')
const logout = require('./logout')
const user_router = new express.Router()

//Login User 
user_router.post('/login', async (req, res) => {
    try{
    console.log("")
    const user = await User.findByCredentials(req.body.email , req.body.password)
    console.log("")
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
user_router.post('/logout', Authenticate, logout, async (req, res) => {
    //console.log('here')
    try {
        await req.user.save()
    } catch (e) {
        res.status(500).send()
    }
})

//getting Authenticated User from DB
user_router.get('/me', Authenticate, async (req , res) => {
       res.send(req.user)
})

//getting Users from DB and be Authenticated!
user_router.get('/data2table' , async (req, res) => {
    try {
        const users = await User.find({})
        //console.log(users)
        res.send(users)
    } catch (e) {
        res.status(500).send()
    }
})

//getting one User from DB
user_router.get('/:id', async (req, res) => {
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
user_router.patch('/:id', async (req, res) => {
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
user_router.post('/add', Authorize, async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.redirect('/users')
    } catch (e) {
        res.status(400).send(e)
    }
})



//Logout All-Users
user_router.post('/logoutAll', Authenticate, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})



//deleting User from DB
user_router.delete('/users/delete',Authorize, async (req, res) => {
    try{
        const user = await User.findById(req.body)
        console.log('0')
        if(!user.root){
            user.remove()
            console.log('1')
            req.flash('success','User Removed')
            res.redirect('back')
        }
    } catch (error) {
       
    }
})

//deleting All documents from DB
user_router.delete('delete_all' , async (req, res) => { 
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
