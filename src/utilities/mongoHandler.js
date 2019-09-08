const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://192.168.0.128:27017'
const databaseName = 'clientManager'
const collectionName = 'clientLog'

// Using in callback style
const getLogsFromDB = (myfilter,callback) => {
    mongoClient.connect(connectionURL,{useNewUrlParser: true},(error, client) => {
        if(error) {
            console.log('Error in MongoDB connection (MongoHandler)')
            callback(error,undefined)
        } else {
        const clientLogs = client.db(databaseName).collection(collectionName)
        const result = clientLogs.find(myfilter).toArray((error,logList) => {
            callback(undefined,logList)
        })
        //when finish - Close the connection!!
        client.close()
        }
        
    })
}

module.exports = getLogsFromDB