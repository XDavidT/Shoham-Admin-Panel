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
    rulesArray=[]
    for ( var i=0; i<events.ruleNum.length;i++){	
        rulesArray[i]={
            rule_id : events.ruleNum[i],
            repeated : Number(events.repeated[i]),
            timeout : Number(events.TIMEOUT[i])
        }
    }
   nextID = getNextSequenceValue( client.db(dbPolicy),"eventCounter");
   
   nextID.then(function(eventID){
        client.db(dbPolicy).collection(collEvents).insert({
                _id:eventID,
                name:events.eventName,
                description:events.eventDescription,
                type:events.type_select,
                alerts:events.alerts,
                rules: rulesArray
        })
    callback(error,undefined)
    client.close()
})
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
    postCategoryToDB: postCategoryToDB
}