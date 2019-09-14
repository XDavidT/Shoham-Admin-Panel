const express = require('express')
const User = require('../utilities/Users/models/user_model')
const router = express()
require('../utilities/Users/handler/UsersHandler')

router.use(express.json())

router.get('/users',(req, res) =>{
    res.jason('users',{
        
    })
})

//getting Users to DB
router.get('/users/data2table',(req, res) => {
    User.find({}).then((users) => {
        res.send(users).status(200)
    }).catch((error) => {

    })
})

router.get('/users/data2table/:id', async (req, res) => {
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

router.patch('/users/data2table/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

//posting Users to DB
router.post('/users/data2table',(req,res) => {
    const user = new User(req.body)
    user.save().then(() => {
        res.status(201).send(user)
    }).catch((error) => {
        res.status(400).send(error)

})
})

router.listen(3000 ,() => {
    console.log('Server is up on port 3000')
})

