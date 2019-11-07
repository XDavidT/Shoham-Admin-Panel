$.getJSON('/api/policy/eventData2table',function(data){
    
    $(document).ready(function() {
        //Table start
        var table = $('#eventDataTable').DataTable({
            orderCellsTop: true,
            fixedHeader: true,
            data:data,
            "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]],
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

        //Add event Modal
        $('#AddEventButton').click(function(e){
            e.preventDefault()
            $('#EvtModal').modal()
            $('#submitModal').text('ADD')
            $('#EvtModalHead').text('Add Event')
        })

        //On click - Modal in table
        $('#eventDataTable tbody').on('click','tr',function(e){
            e.preventDefault()
            var data = table.row( this ).data()
            $('#EvtModal').modal()
            $('#eventID').val(data._id)
            $('#EvtModalHead').text('Edit Event')
            $('#eventName').val(data.name)
            $('#evtDescription').val(data.description)
            $('#type_select').val(data.type)
            $('#submitModal').text('EDIT')
            //TODO: Add method
            $('#ruleID0').val(data.rules[0].rule_id)
            $('#ruleRepeat0').val(data.rules[0].repeated)
            $('#ruleTimeout0').val(data.rules[0].timeout)
            if(data.rules.length>1){
                $('#rulesCount').val(data.rules.length)
                for(var i =1;i<data.rules.length;i++){
                    $( "#event_creation_details" ).append( "<div class='form-row' id='rulesList"+i+"'> <div class='col-md-4 mb-3'> <input type='number' class='form-control' id='ruleID"+i+"' placeholder='#' id='Rule ID' name='Rule ID' autocomplete='off' required> <div class='valid-tooltip'> Looks good! </div></div><div class='col-md-4 mb-3'> <input type='number' class='form-control' id='ruleRepeat"+i+"' placeholder='1 or more' value='1' id='repeated' name='repeated' autocomplete='off' required> <div class='valid-tooltip'> Looks good! </div></div><div class='col-md-4 mb-3'> <div class='input-group'> <input type='number' class='form-control' id='ruleTimeout"+i+"' placeholder='In seconds' aria-describedby='validationTooltipUsernamePrepend' id='TIMEOUT' name='TIMEOUT' autocomplete='off' required> <div class='invalid-tooltip'> Please choose timeout bigger then 0 </div></div></div></div>" );
                    $('#ruleID'+i).val(data.rules[i].rule_id)
                    $('#ruleRepeat'+i).val(data.rules[i].repeated)
                    $('#ruleTimeout'+i).val(data.rules[i].timeout)
                }
            }

        })

        //Manage rules when adding new event
        $('#addMore').click(function(e){
            //Manage counting
            e.preventDefault()
            const rule_count = $('#rulesCount').val()
            let int_rule_count = Number(rule_count)
            int_rule_count++
            let rule_index = Number(int_rule_count)
            rule_index-- 

            $('#eventName').empty()
            $('#evtDescription').empty()
            $( "#event_creation_details" ).append( "<div class='form-row'> <div class='col-md-4 mb-3'> <input type='number' class='form-control' id='ruleID"+rule_index+"' placeholder='#' id='Rule ID' name='Rule ID' autocomplete='off' required> <div class='valid-tooltip'> Looks good! </div></div><div class='col-md-4 mb-3'> <input type='number' class='form-control' id='ruleRepeat"+rule_index+"' placeholder='1 or more' value='1' id='repeated' name='repeated' autocomplete='off' required> <div class='valid-tooltip'> Looks good! </div></div><div class='col-md-4 mb-3'> <div class='input-group'> <input type='number' class='form-control' id='ruleTimeout"+rule_index+"' placeholder='In seconds' aria-describedby='validationTooltipUsernamePrepend' id='TIMEOUT' name='TIMEOUT' autocomplete='off' required> <div class='invalid-tooltip'> Please choose timeout bigger then 0 </div></div></div></div>" );
            $('#rulesCount').val(int_rule_count)
        })

        // Add or Edit button
        $('#submitModal').click(()=>{
            const getJsonReady ={}
            var postUrl = '/api/policy/postEvents' 
            //Check if its new event or edited
            if($('#eventID').val()){
                console.log('Heloom!!')
                getJsonReady['_id'] = $('#eventID').val()
                postUrl = '/api/policy/editEvent'
            }
            
            //Regular values
            getJsonReady['name'] = $('#eventName').val()
            getJsonReady['description'] = $('#evtDescription').val()
            getJsonReady['type'] = $('#type_select').val()
            
            //Check alerts
            getJsonReady['alerts'] = {}
            if($('#AlertEmail').is(':checked')) getJsonReady['alerts']['email'] = true
            else getJsonReady['alerts']['email'] = false
            if($('#AlertSMS').is(':checked')) getJsonReady['alerts']['sms'] = true
            else getJsonReady['alerts']['sms'] = false
            if($('#AlertApp').is(':checked')) getJsonReady['alerts']['app'] = true
            else getJsonReady['alerts']['app'] = false
            
            //Get all rules
            getJsonReady['rules'] = []
            var count_rules = $('#rulesCount').val()
            for(var i=0;i<count_rules;i++){
                getJsonReady['rules'].push({
                  rule_id: $('#ruleID'+i).val(),
                  repeated: $('#ruleRepeat'+i).val(),
                  timeout: $('#ruleTimeout'+i).val()
                })
            }
            $.ajax({
                type: 'POST',
                url:postUrl,
                data: getJsonReady,
                'Content-Type': "application/json",
                success: ()=>{
                    $('#EvtModal').modal("hide")
                    $('#rulesCount').val('1')
                }
            })

        })


        //Modal Hide
        $('#EvtModal').on('hidden.bs.modal', function (e) {
            e.preventDefault()
            $('#eventName').val('')
            $('#evtDescription').val('')
            $('#ruleID0').val('')
            $('#ruleRepeat0').val('1')
            $('#ruleTimeout0').val('')
            var rules_to_clean = $('#rulesCount').val()
            for(var i=1;i<rules_to_clean;i++){
                $('#rulesList'+i).remove()
            }
            $('#rulesCount').val('1')
        })
    }); //end document
}) //end json


