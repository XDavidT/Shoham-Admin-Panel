const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://192.168.0.128:27017'
const databaseName = 'clientManager'
const collectionName = 'clientLog'

// Using in callback style
const getLogsFromDB = (myfilter,callback) => {
    mongoClient.connect(connectionURL,{useNewUrlParser: true},(error, client) => {
        if(error) {
<<<<<<< HEAD
            console.log('Connection to mongo fail !')
            console.log(error)
            callback(error,undefined)
        } else {
            const clientLogs = client.db(databaseName).collection(collectionName)
            clientLogs.find(myfilter).toArray((error,logList) => {
=======
            console.log('Error in MongoDB connection (MongoHandler)')
            callback(error,undefined)
        } else {
        const clientLogs = client.db(databaseName).collection(collectionName)
        const result = clientLogs.find(myfilter).toArray((error,logList) => {
>>>>>>> 8fa83bf039889e090a869334739bc631cacfecfd
            callback(undefined,logList)
        })
        }
        
        //when finish - Close the connection!!
        client.close()
        }
        
    })
}

module.exports = getLogsFromDB