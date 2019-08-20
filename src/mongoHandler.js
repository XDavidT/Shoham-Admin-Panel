const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://104.45.156.216:27017'
const databaseName = 'client-manager'

mongoClient.connect(connectionURL,{useNewUrlParser: true},(error, client) => {
    if(error){
        return console.log('Unable to connect database')
    }
    const clientMgrDB = client.db(databaseName)
})