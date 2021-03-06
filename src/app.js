const express = require('express')
const app = express()

//login necessary consts
const Authenticate = require('../src/routers/authentication')

//Parsers
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

//Routers
const site_Router = require('./routers/site_pages')
const gen_Router = require('./routers/general_router')
const user_Router = require('./routers/user_router')
const logs_Router = require('./routers/logs_router')
const policy_Router = require('./routers/policy_router')
const offense_Router = require('./routers/offense_router')
const Authorize = require('./routers/authorization')

const session = require('express-session')
const flash = require('connect-flash')

require('./utilities/models/user_model')
require('./utilities/handler/policyHandler')

const path = require('path')
const hbs = require('hbs')


// Define paths for express config
const viewsPath = path.join(__dirname,'../templates/views')
const public_dir = path.join(__dirname,'../public')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars// /
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static dir to server
app.use(express.static(public_dir))
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
  app.use(cookieParser())

// flash messages middelware
app.use(session({
    secret:'session secret',
    resave: false, 
    saveUninitialized: false,
}));

app.use(flash())

// Routers //
app.use(site_Router)
app.use('/api/gen', gen_Router)
app.use('/api/users', user_Router)
app.use('/api/logs', logs_Router)
app.use('/api/policy', policy_Router)
app.use('/api/offense',offense_Router)


//Get resolver for site
app.get('', (req, res) => {
    res.render('login',{
    })
})

app.get('/index',Authenticate, (req, res) => {
    res.render('index',{
    })
})

app.get('*',(req, res) =>{
    res.status(404);
    res.render('404',{
        
    })
})


app.listen(3000 ,() => {
    console.log('Server is up on port 3000')
})