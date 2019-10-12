const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient
const connectionURL = 'mongodb://mongo.davidt.net:27018'

//////////Logs-DB//////////
const databaseName = 'SystemManagment'
const collectionName = 'setting'



// Using in callback
const getSettingFromDB = (kindOfSetting,callback) => {
    mongoClient.connect(connectionURL,{useNewUrlParser: true , useUnifiedTopology: true },(error, client) => {
        if(error) {
            callback(error,undefined)
        } else {
        const settingCollection = client.db(databaseName).collection(collectionName)
        const result = settingCollection.findOne(kindOfSetting,(error,result) => {
            if (error){ 
                callback(error,undefined)
            }
            else callback(undefined,result)
        })
        client.close()
        }
        
    })
}




module.exports = getSettingFromDB
