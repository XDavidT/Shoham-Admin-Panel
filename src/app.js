const express = require('express')
const app = express()
const user_Router = require('./Routers/user_router')
const logs_Router = require('./Routers/logs_router')
require('./utilities/Users/models/user_model')

const path = require('path')
const hbs = require('hbs')
const mongo_handler = require('./utilities/Logs/handler/LogsHandler')
const policy_handler = require('./utilities/Policy/handler/policyHandler')

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

const bodyParser = require('body-parser')
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: false}))

app.get('/logs',(req, res) =>{
    res.render('logs',{
        
    })
})


app.get('/api/logs/data2table',(req, res) => {
    mongo_handler.getLogsFromDB(req.query,(error,result) =>{
        if(error){
            res.send(error)
        } else {
            res.jsonp(result)
        }
    })
})

app.get('/policy',(req, res) =>{
    res.render('policy',{
    })
})

app.post('/api/policy/postRules', (req, res) => {

    policy_handler.postRulesToDB(req.body,(error,result) =>{
        if(error){
            res.send(error)
        } else {
            res.redirect('/policy')
        }
    })

})



app.get('/api/policy/data2table',(req, res) => {
    policy_handler.getRulessFromDB(req.query,(error,result) =>{
        if(error){
            res.send(error)
        } else {
            res.jsonp(result)
        }
    })
})

app.post('/api/policy/postEvents', (req, res) => {
    console.log(req.body)
    policy_handler.postEventsToDB(req.body,(error,result) =>{
        if(error){
            res.send(error)
        } else {
            console.log("Sadsadasdasdasdas")
            res.redirect('/policy')
        }
    })

})

app.post('/policy/category_select', (req, res) => {
    policy_handler.postCategoryToDB(req.body,(error,result) =>{
        if(error){
            res.send(error)
        } else {
            res.redirect('/policy')
        }
    })

})

app.get('/api/policy/eventData2table',(req, res) => {
    policy_handler.getEventsFromDB(req.query,(error,result) =>{
        if(error){
            res.send(error)
        } else {
            console.log(result)
            res.jsonp(result)
        }
    })
})

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