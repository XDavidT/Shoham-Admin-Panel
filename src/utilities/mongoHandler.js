const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient
const connectionURL = 'mongodb://13.68.170.154:27017'

//////////Logs-DB//////////
const databaseName = 'clientManager'
const collectionName = 'clientLog'
//////////Logs-DB//////////



// Using in callback style
const getLogsFromDB = (myfilter,callback) => {
    mongoClient.connect(connectionURL,{useNewUrlParser: true},(error, client) => {
        if(error) {
            callback(error,undefined)
        }
        const clientLogs = client.db(databaseName).collection(collectionName)
        const result = clientLogs.find(myfilter).toArray((error,logList) => {
            callback(undefined,logList)
        })
        //when finish - Close the connection!!
        client.close()
    })
}




module.exports = {
    getLogsFromDB: getLogsFromDB, //logs from MongoDB
}

 
