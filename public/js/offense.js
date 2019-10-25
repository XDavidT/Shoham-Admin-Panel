$(document).ready(()=>{
    //search start
    $('#dataTableOffense tfoot th').each(function () {
        var title = $(this).text();
        $(this).html( '<input type="text" class="form-control" placeholder="Search '+title+'" />' );
    } );

    //DataTable builder
    var offenseTable = $('#dataTableOffense').DataTable( {
        order:[[1,""]],
        processing: true,
        serverSide: true,
        ajax: {
            url: '/api/offense/get',
            type: 'POST'
        },
        columns: [
            {data: '_id'},
            {data: 'event'},
            {data: 'type'},
            {data: 'device.0'},
            {data: 'offense_close_time'},
            {data: 'logs', "visible": false}
        ]
    } )
    //search continue
    offenseTable.columns().every(function () {
        var that = this;
        $( 'input', this.footer() ).on( 'keyup change clear', function () {
            if ( that.search() !== this.value ) {
                that
                    .search( this.value )
                    .draw();
            }
        } );
    } );


    $('#dataTableOffense tbody').on('click','tr',function(e){
        e.preventDefault()
        var data = offenseTable.row( this ).data()
        $('#offense-view').modal()  //Add data into the modal
        $('#offense-header').text("Offense View: "+data._id)
        $('#event-label').text(data.event)
        $('#time-label').text(data.offense_close_time)
        $('#type-label').text(data.type)
        $(data.device).each(function(index, one_device){
            $('#devices-list-modal').append('<li>'+index+') '+one_device+'</li>')
        })
        $(data.logs).each(function (index,log) {
            const logViewByIndex = 'log-view'+index
            $('#logs-list-modal').append(index+'. <ul id="'+logViewByIndex+'"></ul>')
            $.each(log,function(key,val){
                $('#'+logViewByIndex).append('<li><b>'+key+':</b> '+val+'</li>')
            })
        })
    })
    $("#offense-view").on('hidden.bs.modal', function () {
        $('#devices-list-modal').empty()
        $('#logs-list-modal').empty() //Clear the shit from the modal
        $('#offense-header').empty()
        $('#event-label').empty()
        $('#time-label').empty()
        $('#type-label').empty()
    })

})