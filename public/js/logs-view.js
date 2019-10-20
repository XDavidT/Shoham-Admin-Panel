// $.getJSON('/api/logs/data2table',function(data){
//     $(document).ready(function() {

//         $('#dataTableLogs thead tr').clone(true).appendTo( '#dataTableLogs thead' );
//         $('#dataTableLogs thead tr:eq(1) th').each( function (i) {
//             var title = $(this).text();
//             $(this).html( '<input type="text" placeholder="Search '+title+'" />' );
     
//             $( 'input', this ).on( 'keyup change', function () {
//                 if ( table.column(i).search() !== this.value ) {
//                     table
//                         .column(i)
//                         .search( this.value )
//                         .draw();
//                 }
//             } );
//         } );

//         var table = $('#dataTableLogs').DataTable({
//             orderCellsTop: true,
//             fixedHeader: true,
//             data:data,
//             columns: [
//                 {data: 'logid'},
//                 {data: 'insert_time'},
//                 {data: 'type'},
//                 {data: 'src'},
//                 {data: 'cat'},
//                 {data: 'hostname'},
//                 {data: 'ip_add'},
//                 {data: 'mac_add'},
//                 {data: 'username'},
//                 {data: 'os'}
                
//             ]
//         });
//       });
// }).done(function() {
//     $('.loading-section').hide();   //Hide Loading GIF when done to load the logs
//   }).fail(function() {
//     console.log( "error" );
//   })
$(document).ready(function(){
    $('#dataTableLogs tfoot th').each( function () {
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
    logsTable.columns().every( function () {
        var that = this;
 
        $( 'input', this.footer() ).on( 'keyup change clear', function () {
            if ( that.search() !== this.value ) {
                that
                    .search( this.value )
                    .draw();
            }
        } );
    } );

})