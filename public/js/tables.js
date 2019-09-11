$.getJSON('/logs/data2table',function(data){
    $(document).ready(function() {

        $('#dataTableLogs thead tr').clone(true).appendTo( '#dataTableLogs thead' );
        $('#dataTableLogs thead tr:eq(1) th').each( function (i) {
            var title = $(this).text();
            $(this).html( '<input type="text" placeholder="Search '+title+'" />' );
     
            $( 'input', this ).on( 'keyup change', function () {
                if ( table.column(i).search() !== this.value ) {
                    table
                        .column(i)
                        .search( this.value )
                        .draw();
                }
            } );
        } );

        var table = $('#dataTableLogs').DataTable({
            orderCellsTop: true,
            fixedHeader: true,
            data:data,
            columns: [
                {data: 'logid'},
                {data: 'time'},
                {data: 'type'},
                {data: 'src'},
                {data: 'cat'},
                {data: 'hostname'},
                {data: 'ip_add'},
                {data: 'mac_add'},
                {data: 'username'},
                {data: 'os'}
            ]
        });
      });
}).done(function() {
    $('.loading-section').hide();   //Hide Loading GIF when done to load the logs
  }).fail(function() {
    console.log( "error" );
  })


