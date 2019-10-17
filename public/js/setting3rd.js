$(document).ready( ()=> {
    $.getJSON( '/api/setting/get',{"_id":"smtp-setting"}
    ).done((jsonData)=> {
        $("#SmtpServer").val(jsonData['smtp-server'])
        $("#ServerPort").val(jsonData['smtp-server-port'])
        $("#SmtpUser").val(jsonData['email-username'])
        $("#SmtpPass").val(jsonData['email-password'])
    })
})

$("#submit-setting").click(()=>{
    const jsonString = {}
    jsonString['_id'] = "smtp-setting"
    jsonString['smtp-server'] = $("input#SmtpServer").val()
    jsonString['smtp-server-port'] = $("input#ServerPort").val()
    jsonString['email-username'] = $("input#SmtpUser").val()
    jsonString['email-password'] = $("input#SmtpPass").val()
    $.ajax({
        type: 'POST',
        url:'/api/setting/update',
        data: jsonString,
        success: ()=>{alert('sent !')},
        'Content-Type': "application/json",
    })
})