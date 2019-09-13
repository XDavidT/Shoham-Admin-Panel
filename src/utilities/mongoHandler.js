const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient
const connectionURL = 'mongodb://13.68.170.154:27017'

<<<<<<< HEAD
//////////Logs-DB//////////
=======
                        //Sahar Azure DB
const connectionURL = 'mongodb://13.68.170.154:27017'
>>>>>>> dbd669ab8e9b121b91d307a8f04467e46b32e605
const databaseName = 'clientManager'
const collectionName = 'clientLog'
//////////Logs-DB//////////



// Using in callback
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
        client.close()
        }
        
    })
}



<<<<<<< HEAD

module.exports = {
    getLogsFromDB: getLogsFromDB, //logs from MongoDB
}

 
=======
module.exports = getLogsFromDB
>>>>>>> dbd669ab8e9b121b91d307a8f04467e46b32e605
