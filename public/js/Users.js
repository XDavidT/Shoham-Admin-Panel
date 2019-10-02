$.getJSON('/users/data2table',function(data){
    $(document).ready(function() {

        $('#dataTableUsers thead tr').clone(true).appendTo( '#dataTableUsers thead' );
        $('#dataTableUsers thead tr:eq(1) th').each( function (i) {
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

        var table = $('#dataTableUsers').DataTable({
            orderCellsTop: true,
            fixedHeader: true,
            data:data,
            columns: [
                {data: '_id'},
                {data: 'name'},
                {data: 'email'},
                {data: 'role'}
            ]
        });
      });
})

function emptyInput(target) {
    if (target=="user"){

        if(document.getElementById("name").value==="" || document.getElementById("email").value===""
        || document.getElementById("password").value==="" || document.getElementById("role").value==="")
        { 
            document.getElementById('send').disabled = true; 
        } else { 
            document.getElementById('send').disabled = false;
        }
    }

}
