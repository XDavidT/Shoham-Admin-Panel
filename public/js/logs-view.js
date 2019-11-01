$(document).ready(function (){
    $('#dataTableLogs tfoot th').each(function () {
        var title = $(this).text();
        $(this).html( '<input type="text" class="form-control" placeholder="Search '+title+'" />' );
    } )

    var logsTable = $('#dataTableLogs').DataTable( {
        order:[[1,"desc"]],
        processing: true,
        serverSide: true,
        ajax: {
            url: '/api/logs/loadata',
            type: 'POST'
        },
        columns: [
            {data: 'logid'},
            {data: 'insert_time'},
            {data: 'src'},
            {data: 'cat'},
            {data: 'hostname'},
            {data: 'ip_add'},
            {data: 'mac_add'},
            {data: 'username'},
            {data: 'os'}
        ]
    } )
    logsTable.columns().every(function () {
        var that = this;
 
        $( 'input', this.footer() ).on( 'keyup change clear', function() {
            if ( that.search() !== this.value ) {
                that
                    .search( this.value )
                    .draw();
            }
        } );
    } );

    //Fill the modal
    $('#dataTableLogs tbody').on('click','tr',function(e){
        e.preventDefault()
        var data = logsTable.row( this ).data()
        $('#log-view').modal()  //Add data into the modal
        $('#log-header').text("Log View: "+data._id)
        $('#logid-label').text(data.logid)
        $('#clientime-label').text(data.client_time)
        $('#insertime-label').text(data.insert_time)
        $('#type-label').text(data.type)
        $('#src-label').text(data.src)
        $('#cat-label').text(data.cat)
        $('#host-label').text(data.hostname)
        $('#user-label').text(data.username)
        $('#os-label').text(data.os)
        $('#ip-label').text(data.ip_add)
        $('#mac-label').text(data.mac_add)
        $(data.dataList).each(function(index, value){
            $('#logs-list-modal').append('<li>'+index+') '+value+'</li>')
        })
    })
    //Clear the shit from the modal
    $("#log-view").on('hidden.bs.modal', function () {
        $('#log-header').empty()
        $('#logid-label').empty()
        $('#clientime-label').empty()
        $('#insertime-label').empty()
        $('#type-label').empty()
        $('#src-label').empty()
        $('#cat-label').empty()
        $('#host-label').empty()
        $('#user-label').empty()
        $('#os-label').empty()
        $('#ip-label').empty()
        $('#mac-label').empty()
        $('#logs-list-modal').empty()
    })
})