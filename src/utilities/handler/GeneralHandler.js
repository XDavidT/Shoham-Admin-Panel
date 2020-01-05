const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient
const connectionURL = 'mongodb://siem.davidt.net:27018'

//////////Logs-DB//////////
const databaseName = 'SystemManagment'
const policyDb = 'policyManager'
const collectionName = 'setting'
const offenseCollection = 'success-alert'



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

const offenseByMonths = (nothing,callback)=>{
    mongoClient.connect(connectionURL,{useNewUrlParser:true,useUnifiedTopology:true},(error,client)=>{
        if(error) callback(erro,undefined)
        else{
            const jsonStruct = {
                "months":["January","February","March","April","May","June","July",
                "August","September","October","November","December"]
            }
            giveMeCounts(client).then(result=>{
                jsonStruct['counts'] = result
                callback(undefined,jsonStruct)
            })

        }
    })
}

//Promise the 'for' loop
const giveMeCounts = async client => {
    const countOffensesByMonths = new Array()
    for (let i = 1; i <= 12; i++) {
      const countThis = await client.db(policyDb).collection(offenseCollection).countDocuments({ 
        "$expr": {
            $and:[ 
                { "$eq": [{ "$month": "$offense_close_time" }, i] },
                { "$eq": [{ "$year": "$offense_close_time" }, new Date().getFullYear()] } 
            ]
                }  
        })
    countOffensesByMonths.push(countThis)
    }
    return countOffensesByMonths
}




module.exports = {getSettingFromDB:getSettingFromDB,updateSetting:updateSetting,offenseByMonths:offenseByMonths}
