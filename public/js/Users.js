$.getJSON('/api/users/data2table',function(data){
    $(document).ready(function() {

        $('#dataTableUsers thead tr').clone(true).appendTo( '#dataTableUsers thead' );
        $('#dataTableUsers thead tr:eq(1) th').each( function (i) {
            var title = $(this).text();
            $(this).html( '<input type="text" id="search-col'+i+'" placeholder="Search '+title+'" />' );
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
                {data: 'name'},
                {data: 'email'},
                {data: 'role'},
                {data: null} 
            ],
            "columnDefs": [ {
                "targets": -1,
                "searchable": false,
                "orderable": false,
                "data": null,
                "defaultContent": '<button type="button" class="btn btn-danger btn-circle btn-sm" id="removeUser"><i class="fas fa-trash"></i></button>'
            } ]
        });

        $("#search-col4").hide(); //hide search for Remove column

        $('#dataTableUsers tbody').on('click','#removeUser', function (e) {
            e.preventDefault();
            var data = table.row( $(this).parents('tr') ).data();
            const jsonString = {}
            jsonString['_id'] = data['_id'] 
            $.ajax({
                type: 'DELETE',
                url: '/api/users/deleteOne',
                data: jsonString,
                'Content-Type': "application/json",
                complete:function(){
                    location.reload()
                }
                })
            });
            $('#dataTableUsers tbody').on('click','#editUser', function () {
                var data = table.row( $(this).parents('tr') ).data();
                const jsonString = {}
                jsonString['_id'] = data['_id'] 
                $.ajax({
                    type: 'PATCH',
                    url: '/api/users/:id',
                    data: jsonString,
                    'Content-Type': "application/json",
                    success: function(){
                    
                    }
                    })
                });       
        });
    });



 
    


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

