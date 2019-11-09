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
                {data: 'value'},
                {
                    data:null,
                    render:function(data,type,row){
                        return "<button class='btn btn-danger btn-circle btn-sm' id='"+data._id+"' onClick='deleteRule(this.id)'><i class='fas fa-trash'></i></button>"
                    }
                }
                ]
        });
        $('#RuleDataTable tbody').on('click','tr',function(e){
            e.preventDefault()
            var data = table.row( this ).data()
            $('#editRuleModal').modal("show");
            $('#editNameRule').val(data.name)
            $('#editruleField').val(data.field)
            $('#editruleValue').val(data.value)
            document.getElementById("originaFieldsValue").value=JSON.stringify(data)
            
        })



        $('#addMore').click(function(){
            var $button = $('.form-row').clone();
            $('.event_creation_details').html($button);
        })

    
        
    });
})


function deleteRule(id){
    $('#editRuleModal').modal({show:false})
    var jsonFormat = { }
    console.log(id)
    jsonFormat['_id'] = id
    $.ajax({
     type: 'POST',
     url:'/api/policy/deleteRule',
     data: jsonFormat,
     'Content-Type': "application/json",
     complete:function(data){
         location.reload()
     }
 })
}
                //event table//
