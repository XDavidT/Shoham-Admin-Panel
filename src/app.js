const express = require('express')
const path = require('path')
const hbs = require('hbs')

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

app.get('', (req, res) => {
    res.render('index',{

    })
})

app.get('/tables',(req, res) =>{
    res.render('tables',{

    })
})

app.get('*',(req, res) =>{
    res.render('404',{

    })
})











app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})