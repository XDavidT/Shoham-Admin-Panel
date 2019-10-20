$(document).ready(()=>{
    $('#dataTableOffense tfoot th').each(()=> {
        var title = $(this).text();
        $(this).html( '<input type="text" class="form-control" placeholder="Search '+title+'" />' );
    } );

    var logsTable = $('#dataTableOffense').DataTable( {
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
            {data: 'device'},
            {data: 'offense_close_time'}        
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