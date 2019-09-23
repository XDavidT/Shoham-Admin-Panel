const express = require('express')
const app = express()
const user_Router = require('./Routers/user_router')
const logs_Router = require('./Routers/logs_router')
require('./utilities/Users/models/user_model')

const path = require('path')
const hbs = require('hbs')


// Define paths for express config
const viewsPath = path.join(__dirname,'../templates/views')
const public_dir = path.join(__dirname,'../public')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static dir to serve
app.use(express.static(public_dir))
app.use(express.json())
app.use(user_Router)
app.use(logs_Router)



//Get resolver for site
app.get('', (req, res) => {
    res.render('index',{
    })
})


app.get('*',(req, res) =>{
    res.render('404',{

    })
})


app.listen(3000 ,() => {
    console.log('Server is up on port 3000')
})