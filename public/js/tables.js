$.getJSON('/logs/data2table',function(data){
    $(document).ready(function() {
        $('#dataTableLogs').DataTable({
            data:data,
            columns: [
                {data: 'logid'},
                {data: 'time'},
                {data: 'type'},
                {data: 'src'},
                {data: 'cat'},
                {data: 'hostname'},
                {data: 'ip_add'},
                {data: 'username'},
                {data: 'os'}
            ]
        });
      });
})


//TODO: Understand how datatable is generate (select entries etc..)