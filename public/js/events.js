$.getJSON('/api/policy/eventData2table',function(data){
    
    $(document).ready(function() {
        //Table start
        var table = $('#eventDataTable').DataTable({
            orderCellsTop: true,
            fixedHeader: true,
            data:data,
            "pageLength": 5,
            columns: [
                {data: '_id'},
                {data: 'name'},
                {data: 'description'},
                {data: 'type'},
                {data: 'rules.rule_id', 
                render: function ( full, type, full, meta ) {
                    var result = '';                   
                    $.each(full.rules, function( index, value ) {

                      result_temp = value.rule_id;
                      if (index < full.rules.length)
                      result = result + result_temp + ', '  ;

                    });
                    return result.split(", ").join("<br/>");
                },
                "className": "text-center"
            },
                {data: 'rules.repeated',
                render: function ( full, type, full, meta ) {
                    var result = '';
                    $.each(full.rules, function( index, value ) {

                        result_temp = value.repeated;
                        if (index < full.rules.length)
                        result = result + result_temp + ', '  ;

                    });
                    return result.split(", ").join("<br/>");
                },
                "className": "text-center"
            },
                {data: 'rules.timeout',
                render: function ( full, type, full, meta ) {
                    var result = '';
                    $.each(full.rules, function( index, value ) {

                        result_temp = value.timeout;
                        if (index < full.rules.length)
                        result = result + result_temp + ', '  ;

                    });
                    return result.split(", ").join("<br/>");
                },
                "className": "text-center"
            }
            ]
        });
        //Table end

        //On click - Modal
        $('#eventDataTable tbody').on('click','tr',function(e){
            e.preventDefault()
            var data = table.row( this ).data()
            $('#EvtModal').modal("show");
            $('#eventID').val(data._id)
            $('#EvtModalHead').text('Edit Event')
            $('#eventName').val(data.name)
            $('#evtDescription').val(data.description)
            $('#type_select').val(data.type)
            

        })
       //On click - Modal
       $('#EvtModal').on('hidden.bs.modal', function () {
            $('#EvtModalHead').empty()
            $('#eventName').empty()
            $('#evtDescription').empty()
        })


        //Manage rules when adding new event
        $('#addMore').click(function(e){
            e.preventDefault()
            var rule_count = $('#rulesCount').val()
            var rule_counter = parseInt(rule_count) //make it Int
            $('#EvtModalHead').val('Add Event')
            $('#eventName').empty()
            $('#evtDescription').empty()
            rule_counter += 1
            $( "#event_creation_details" ).append( "<div class='form-row'> <div class='col-md-4 mb-3'> <input type='text' class='form-control' id='ruleID"+rule_counter+"' placeholder='#' id='Rule ID' name='Rule ID' autocomplete='off' required> <div class='valid-tooltip'> Looks good! </div></div><div class='col-md-4 mb-3'> <input type='text' class='form-control' id='ruleRepeat"+rule_counter+"' placeholder='1 or more' value='1' id='repeated' name='repeated' autocomplete='off' required> <div class='valid-tooltip'> Looks good! </div></div><div class='col-md-4 mb-3'> <div class='input-group'> <input type='text' class='form-control' id='ruleTimeout"+rule_counter+"' placeholder='In seconds' aria-describedby='validationTooltipUsernamePrepend' id='TIMEOUT' name='TIMEOUT' autocomplete='off' required> <div class='invalid-tooltip'> Please choose timeout bigger then 0 </div></div></div></div>" );
            $('#rulesCount').val(rule_counter)
        })
    }); //end document
}) //end json


