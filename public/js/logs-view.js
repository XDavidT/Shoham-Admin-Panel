$(document).ready(()=>{
    $('#dataTableLogs tfoot th').each(()=> {
        var title = $(this).text();
        $(this).html( '<input type="text" class="form-control" placeholder="Search '+title+'" />' );
    } );

    var logsTable = $('#dataTableLogs').DataTable( {
        order:[[1,""]],
        processing: true,
        serverSide: true,
        ajax: {
            url: '/api/logs/loadata',
            type: 'POST'
        },
        columns: [
            {data: 'logid'},
            {data: 'insert_time'},
            {data: 'type'},
            {data: 'src'},
            {data: 'cat'},
            {data: 'hostname'},
            {data: 'ip_add'},
            {data: 'mac_add'},
            {data: 'username'},
            {data: 'os'}
        
        ]
    } )
    logsTable.columns().every(()=> {
        var that = this;
 
        $( 'input', this.footer() ).on( 'keyup change clear', ()=> {
            if ( that.search() !== this.value ) {
                that
                    .search( this.value )
                    .draw();
            }
        } );
    } );

})