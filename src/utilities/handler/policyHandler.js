const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient

const connectionURL = 'mongodb+srv://siem:iCDoqbyTT3xh@cluster0-ecrrx.gcp.mongodb.net/policyManager?retryWrites=true&w=majority'
const dbPolicy = 'policyManager'
const collRules = 'rules'
const collEvents = 'events'
const collCategory = 'category'

function editID(db){
    db.collection("counters").insert({_id:"eventCounter",sequence_value:0});
    db.collection("counters").insert({_id:"ruleCounter",sequence_value:0});
}

 async function getNextSequenceValue(DB,sequenceName) {
    try {
        var seqNum = await DB.collection("counters").findOneAndUpdate({
            _id: sequenceName
        }, {
                $inc: {
                    sequence_value: 1
                }
            },
            { returnNewDocument: true }
        );
        return (seqNum.value.sequence_value).toString()
    } catch (err) {
        console.error(err)
    }
}

const postEventsToDB = (events,callback)=>{
    mongoClient.connect(connectionURL,{useNewUrlParser: true},(error, client) => {
        if(error) {
            callback(error,undefined)
        }
   nextID = getNextSequenceValue( client.db(dbPolicy),"eventCounter");
   
   nextID.then(function(eventID){
        client.db(dbPolicy).collection(collEvents).insertOne({
                _id:eventID,
                name:events.name,
                description:events.description,
                type:events.type,
                alerts:events.alerts,
                rules: events.rules
        })
    callback(error,undefined)
    client.close()
        })
    })
}

const editEventDB = (event,callback)=>{
    mongoClient.connect(connectionURL,{useNewUrlParser: true},(error, client) => {
        if(error) {
            callback(error,undefined)
        }
    client.db(dbPolicy).collection(collEvents).updateOne({_id:event['_id']},{$set:event} , {upsert: false} ,function(err,result){
        if(err){
            callback(error,undefined)
        }
        else{
            callback(undefined,result)
        }
    })
    client.close()
    })
}

const deleteEventDB = (event,callback)=>{
    mongoClient.connect(connectionURL,{useNewUrlParser: true},(error, client) => {
        if(error) {
            callback(error,undefined)
        }
    client.db(dbPolicy).collection(collEvents).deleteOne({_id:event['_id']},function(err,result){
        if(err){
            callback(error,undefined)
        }
        else{
            callback(undefined,result)
        }
    })
    client.close()
    })
}

const postRulesToDB = (Rules,callback)=>{
    mongoClient.connect(connectionURL,{useNewUrlParser: true},(error, client) => {
        if(error) {
            callback(error,undefined)
        }

    nextID = getNextSequenceValue( client.db(dbPolicy),"ruleCounter");
    nextID.then(function(ruleID){
    
    client.db(dbPolicy).collection(collRules).insert({
            _id:ruleID,
            
            name : Rules.NameRule,
            field: Rules.ruleField,
            value: Rules.ruleValue
        })
        callback(error,undefined)
    client.close()
    })
    
})
}

const getRulessFromDB = (myfilter,callback) => {
    mongoClient.connect(connectionURL,{useNewUrlParser: true},(error, client) => {
        if(error) {
            console.log('Error in MongoDB connection (MongoHandler)')
            callback(error,undefined)
        } else {
        const rules = client.db(dbPolicy).collection(collRules)
        rules.find().toArray((error,rulesList) => {
            callback(undefined,rulesList)
        })
        client.close()
        }
        
    })
}

const editRules = (myfilter,callback) => {
    mongoClient.connect(connectionURL,{useNewUrlParser: true},(error, client) => {
        if(error) {
            console.log('Error in MongoDB connection (MongoHandler)')
            callback(error,undefined)
        } else {
        ruleToReplace = JSON.parse(myfilter.originaFieldsValue)
        const query = {}
        query["_id"] = ruleToReplace._id
        query["name"] = myfilter.NameRule
        query["field"] = myfilter.ruleField
        query["value"] = myfilter.ruleValue
        
        
        const rules = client.db(dbPolicy).collection(collRules)
        rules.findOneAndReplace(ruleToReplace,query).then(replacedDocument => {
            if(replacedDocument){
                callback(error,undefined)
            } else {
            console.log("No document matches the provided query.")
            }
            client.close()
        })
        .catch(err => console.error(`Failed to find and replace document: ${err}`))
        }
        
    })
}

const deleteRulesDB = (rule,callback)=>{
    mongoClient.connect(connectionURL,{useNewUrlParser: true},(error, client) => {
        if(error) {
            callback(error,undefined)
        }
    client.db(dbPolicy).collection(collRules).deleteOne({_id:rule['_id']},function(err,result){
        if(err){
            callback(error,undefined)
        }
        else{
            callback(undefined,result)
        }
    })
    client.close()
    })
}

const getEventsFromDB = (myfilter,callback) => {
    mongoClient.connect(connectionURL,{useNewUrlParser: true},(error, client) => {
        if(error) {
            console.log('Error in MongoDB connection (MongoHandler)')
            callback(error,undefined)
        } else {
        const events = client.db(dbPolicy).collection(collEvents)
        
        eve =events.find().toArray((error,eventsList) => {
            callback(undefined,eventsList)
        })
        client.close()
        }
        
    })
}

const postCategoryToDB = (category,callback)=>{
    mongoClient.connect(connectionURL,{useNewUrlParser: true},(error, client) => {
        if(error) {
            callback(error,undefined)
        }
    category_array = category.category_select
    client.db(dbPolicy).collection(collCategory).findOneAndUpdate(
        {},{ $set: { category_select: category_array} }, { returnNewDocument: true }
    );
    callback(error,undefined)
    client.close()
})
}

module.exports = {
    postRulesToDB: postRulesToDB,
    getRulessFromDB: getRulessFromDB,
    postEventsToDB: postEventsToDB,
    getEventsFromDB:getEventsFromDB,
    postCategoryToDB: postCategoryToDB,
    deleteRulesDB:deleteRulesDB,
    editRules:editRules,
    editEventDB:editEventDB,
    deleteEventDB:deleteEventDB
}