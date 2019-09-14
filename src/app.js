const express = require('express')
const path = require('path')
const hbs = require('hbs')
const mongo_handler = require('./utilities/Logs/handler/LogsHandler')
const app = express()
require('./utilities/Users/handler/UsersHandler')

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
//app.use(userRouter)

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