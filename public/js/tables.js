$.getJSON('/api/logs/data2table',function(data){
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
        });
      });
}).done(function() {
    $('.loading-section').hide();   //Hide Loading GIF when done to load the logs
  }).fail(function() {
    console.log( "error" );
  })


                //rules table//
$.getJSON('/api/policy/data2table',function(data){
    
    $(document).ready(function() {
        
        var table = $('.RuleDataTable').DataTable({
            orderCellsTop: true,
            fixedHeader: true,
            data:data,
            "pageLength": 5,
            columns: [
                {data: '_id'},
                {data: 'name'},
                {data: 'field'},
                {data: 'value'}
            ]
        });
      });
})
                //event table///
$.getJSON('/api/policy/eventData2table',function(data){

    $(document).ready(function() {
        
        var table = $('.eventDataTable').DataTable({
            orderCellsTop: true,
            fixedHeader: true,
            data:data,
            "pageLength": 5,
            columns: [
                {data: '_id'},
                {data: 'name'},
                {data: 'Description'},
                {data: 'rule_id'},
                {data: 'repeated'},
                {data: 'TIMEOUT'}
            ]
        });
      });
})


