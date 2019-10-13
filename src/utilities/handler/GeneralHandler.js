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
        settingCollection.findOne(kindOfSetting,(error,result) => {
            if (error) callback(error,undefined)
            else callback(undefined,result)
        })
        client.close()
        }
        
    })
}

const updateSetting = (newSetting,callback) =>{
    mongoClient.connect(connectionURL,{useNewUrlParser: true , useUnifiedTopology: true },(error, client) => {
        if(error) callback(error,undefined)
        else{
            const settingCollection = client.db(databaseName).collection(collectionName)
            settingCollection.updateOne({_id:newSetting['_id']},{$set:newSetting},{ upsert: true })
            callback(undefined,200)
        }
    })
}




module.exports = {getSettingFromDB:getSettingFromDB,updateSetting:updateSetting}
