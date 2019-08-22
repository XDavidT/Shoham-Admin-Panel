const express = require('express')
const path = require('path')
const hbs = require('hbs')
const getLogsFromDB = require('./utilities/mongoHandler')

const app = express()

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


//Get resolver for site
app.get('', (req, res) => {
    res.render('index',{
    })
})

app.get('/logs',(req, res) =>{
    res.render('logs',{
        
    })
})

//~ Get data from mongoDb API ~//
// req=> your filters {logid: 123, src:"windows..."}
// res=> mongo output {[logid: 123, src:"windows..",type:"2"....],[]...}
app.get('/logs/data2table',(req, res) => {
    getLogsFromDB(req.query,(error,result) =>{
        if(error){
            res.send(error)
        } else {
            res.jsonp(result)
        }
    })
})

app.get('*',(req, res) =>{
    res.render('404',{

    })
})











app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})