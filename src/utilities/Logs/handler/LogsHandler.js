const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient
const connectionURL = 'mongodb://13.68.170.154:27017'

//////////Logs-DB//////////
const databaseName = 'clientManager'
const collectionName = 'clientLog'



// Using in callback
const getLogsFromDB = (myfilter,callback) => {
    mongoClient.connect(connectionURL,{useNewUrlParser: true , useUnifiedTopology: true },(error, client) => {
        if(error) {
            console.log('Error in MongoDB connection (MongoHandler)')
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

 
