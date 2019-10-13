$(document).ready( ()=> {
    $.getJSON( '/api/setting/get',{"_id":"general-setting"}
    ).done((jsonData)=> {
        $("#SystemName").val(jsonData['system-name'])
        $("#TimeToLoad").val(jsonData['time_to_load'])
        $("#XTimeBack").val(jsonData['logs-from-X-hours'])
        $("#BasedOn").val(jsonData['local_based_on'])
    })
})

$("#submit-setting").click(()=>{
    const jsonString = {}
    jsonString['_id'] = "general-setting"
    jsonString['system-name'] = $("input#SystemName").val()
    jsonString['time_to_load'] = $("input#TimeToLoad").val()
    jsonString['logs-from-X-hours'] = $("input#XTimeBack").val()
    jsonString['local_based_on'] = $("select#BasedOn").val()
    $.ajax({
        type: 'POST',
        url:'/api/setting/update',
        data: jsonString,
        success: ()=>{alert('sent !')},
        'Content-Type': "application/json",
    })
})