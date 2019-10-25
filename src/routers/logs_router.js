const express = require('express')
// require('../utilities/handler/LogsHandler')
const LogsModel = require('../utilities/models/logs_model')
const logs_router = new express.Router
const Authenticate = require('./authentication')
const Authorize = require('./authorization')


logs_router.post('/loadata',(req,res)=>{
    try{
        //Checking parameters from DataTables query
        //Order
        const orderBy = {}
        var orderType = 1
        if(req.body['order'][0]['dir'] == 'desc') {orderType = -1}
        orderBy[req.body['columns'][req.body['order'][0]['column']]['data']] = orderType

        //Search
        var searchValue = {}
        if(req.body['search']['value']) {
            searchValue['$text'] = {}
            searchValue['$text']['$search'] = req.body['search']['value']
        }
        //Search field
        const filtering = {}
        for(var i = 0; i < 10;i++){ //TODO: check if size can be dynamic
            if(req.body['columns'][i]['search']['value'])
                filtering[req.body['columns'][i]['data']] = req.body['columns'][i]['search']['value']
        }

            try {
            LogsModel.find({$and:[filtering,searchValue]}).limit(Number(req.body['length'])).skip(Number(req.body['start'])).sort(orderBy).lean().exec((err,logs)=>{
                if(err) res.status(500).jsonp(err)
                LogsModel.countDocuments().exec((err,count)=>{                      //Get size for the collection
                    if(err) res.status(500).jsonp(err)
                    LogsModel.countDocuments(searchValue).exec((err,countFilter)=>{ //Get size for filtered only
                        const resJson = {}
                        if(err) res.status(500).jsonp(err)        //Mongoose return with error
                        else if(countFilter > 0){                //Mongoose return with data
                            resJson['data'] = logs
                            resJson['recordsTotal'] = count
                            resJson['recordsFiltered'] = countFilter
                            res.jsonp(resJson)
                        } 
                        else {                                  //Mongoose return empty                
                            resJson['error'] = 'no result found'
                            res.status(204).jsonp(resJson)
                        }
                    })
                })
            })
        } catch (err) {
            console.log(err)
        }
    }catch(err){
        console.log(err)
    }
})


module.exports = logs_router