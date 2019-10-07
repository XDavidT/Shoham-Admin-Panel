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
                {data: 'role'},
                //{defaultContent:'<form method="delete" action="/users/delete"><input type="hidden" name="_id" value="hidden" /><button class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></button></form>'}
                //{defaultContent:'<form method="delete" action="/users/delete"><button class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></button></form>'}
                { render: function ( data, type, full, meta ) {
                    return '<a href=/#"'+{full}+'>' + 'remove' + '</a>';
                }
                }
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

/*
$('table td').click(function(){
    $(this).parent().remove();
})
*/
// $(document).on('click', 'btn btn-danger btn-circle btn-sm', function () {
//      alert("aa");
//      $(this).closest('tr').remove();
//      return false;
//  });

