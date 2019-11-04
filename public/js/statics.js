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

    $('#UpTimeHead').text('System Up-time')
    setInterval(function(){
        $.get('/api/gen/index-server-uptime',function(result){
            $('#UpTime').text(result)
        })
    },1000)
    
    //logger status
    $('#SystemStatusHead').text('System Status')
    $.get('/api/gen/is-logger-alive',function (status) {
        if(status){
            $("#SystemStatusHead").toggleClass("text-success text-uppercase mb-1")
            $('#SystemStatusCard').toggleClass("border-left-success shadow h-100 py-2")
            $('#SystemStatus').text('Logger: Alive')
        }
        else{
            $("#SystemStatusHead").toggleClass("text-danger text-uppercase mb-1")
            $('#SystemStatusCard').toggleClass("border-left-danger shadow h-100 py-2")
            $('#SystemStatus').text('Logger: Down')
        }
        
    })

})