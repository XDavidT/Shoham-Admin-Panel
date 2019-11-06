                //rules table//
$.getJSON('/api/policy/data2table',function(data){
    
    $(document).ready(function() {
        
        var table = $('#RuleDataTable').DataTable({
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
        $('#RuleDataTable tbody').on('click','tr',function(e){
            e.preventDefault()
            var data = table.row( this ).data()
            console.log(data._id)
            $('#editRuleModal').modal("show");
            $('#editNameRule').val(data.name)
            $('#editruleField').val(data.field)
            $('#editruleValue').val(data.value)
        })

        $('#addMore').click(function(){
            var $button = $('.form-row').clone();
            $('.event_creation_details').html($button);
        })

    
        
    });
})
                //event table//
