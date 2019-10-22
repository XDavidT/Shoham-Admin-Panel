$(document).ready(()=>{
    $('#dataTableOffense tfoot th').each(function () {
        var title = $(this).text();
        $(this).html( '<input type="text" class="form-control" placeholder="Search '+title+'" />' );
    } );

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

    // $('#dataTableOffense').on('click','tr',function(){
    //     var data = offenseTable.row($(this).parents('tr') ).data()
    //     alert(data[0])
    // });
// 
})