const express = require('express')
const User = require('../utilities/Users/models/user_model')
require('../utilities/Users/handler/UsersHandler')

const router = express()
router.use(express.json())



//getting Users to DB
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send()
    }
})

//getting one User from DB

router.get('/users/:id', async (req, res) => {
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
router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
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
router.post('/users', async (req, res) => {
    const user = new User(req.body)
								   
						 

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})
//deleting User from DB
router.delete('/users/:id', async (req, res) => {
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

router.delete('/users' , async (req, res) => { 
    try{
    const user = User.remove({}, function(err,removed) {
    })
} catch(e)
{
    res.status(404).send()
}
})



router.listen(3000 ,() => {
    console.log('Server is up on port 3000')
})

