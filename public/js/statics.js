$(document).ready(function(){

    $('#LogCountHead').text('Logs in Database')
    $.get('/api/logs/count',function(result){
        $('#LogsCount').text(result)
    }).fail(function(){
        alert('error loading logs count')
    })

    $('#OffenseCountHead').text('Offense Discovered')
    $.get('/api/offense/count',function(result){
        $('#OffenseCount').text(result)
    }).fail(function(){
        alert('error loading Offense Count')
    })
})