const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://192.168.0.128:27017'
const databaseName = 'clientManager'
const collectionName = 'clientLog'

// mongoClient.connect(connectionURL,{useNewUrlParser: true},(error, client) => {
//     if(error){
//         return console.log('Unable to connect database')
//     }
//     const clientMgrDB = client.db(databaseName)
// })

// Using in callback style
const getLogsFromDB = (myfilter,callback) => {
    mongoClient.connect(connectionURL,{useNewUrlParser: true},(error, client) => {
        if(error) {
            callback(error,undefined)
        }
        const clientLogs = client.db(databaseName).collection(collectionName)
        const result = clientLogs.find(myfilter,{limit:25}).toArray((error,logList) => {
            callback(undefined,logList)
        })
        //when finish - Close the connection!!
        client.close()
    })
}

module.exports = getLogsFromDB