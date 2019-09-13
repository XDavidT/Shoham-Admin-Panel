$.getJSON('/users/data2table',function(data){
    $(document).ready(function() {

        $('#dataTable thead tr').clone(true).appendTo( '#dataTable thead' );
        $('#dataTable thead tr:eq(1) th').each( function (i) {
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

        var table = $('#dataTable').DataTable({
            orderCellsTop: true,
            fixedHeader: true,
            data:data,
            columns: [
                {data: 'user'},
                {data: 'role'} 
                 
            ]
        });
      });
})


