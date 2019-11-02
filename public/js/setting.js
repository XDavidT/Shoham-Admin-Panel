$(document).ready( ()=> {
    const req_filter = {}
    req_filter['_id'] = "basic-setting"
    $.getJSON( '/api/gen/get-setting',req_filter)
    .done((jsonData)=> {
        $("#SystemName").val(jsonData['system-name'])
        $("#TimeToLoad").val(jsonData['time_to_load'])
        $("#XTimeBack").val(jsonData['logs-from-X-hours'])
        $("#BasedOn").val(jsonData['local_based_on'])
    })
})

$("#submit-setting").click(()=>{
    const jsonString = {}
    jsonString['_id'] = "basic-setting"
    jsonString['system-name'] = $("input#SystemName").val()
    jsonString['time_to_load'] = $("input#TimeToLoad").val()
    jsonString['logs-from-X-hours'] = $("input#XTimeBack").val()
    jsonString['local_based_on'] = $("select#BasedOn").val()
    $.ajax({
        type: 'POST',
        url:'/api/gen/update-setting',
        data: jsonString,
        success: ()=>{alert('sent !')},
        'Content-Type': "application/json"
    })
})