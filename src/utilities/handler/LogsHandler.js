const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient
const connectionURL = 'mongodb://mongo.davidt.net:27018'

//////////Logs-DB//////////
const databaseName = 'clientManager'
const collectionName = 'clientLog'



// Using in callback
const getLogsFromDB = (myfilter,callback) => {
    mongoClient.connect(connectionURL,{useNewUrlParser: true , useUnifiedTopology: true },(error, client) => {
        if(error) {
            callback(error,undefined)
        } else {
        const clientLogs = client.db(databaseName).collection(collectionName)
        const result = clientLogs.find(myfilter).toArray((error,logList) => {
            callback(undefined,logList)
        })
        client.close()
        }
        
    })
}




module.exports = {
    getLogsFromDB: getLogsFromDB //logs from MongoDB
}