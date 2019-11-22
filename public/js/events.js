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
            },
            {
                data:null,
                render:function(data,type,row){
                    if(data.enable == 'true')
                        return "<div class='custom-control custom-switch'><input type='checkbox' class='custom-control-input' id='"+data._id+"' onClick='toggleEvent(this)' checked><label class='custom-control-label' for='"+data._id+"'></label></div>"
                    else
                        return "<div class='custom-control custom-switch'><input type='checkbox' class='custom-control-input' id='"+data._id+"' onClick='toggleEvent(this)'><label class='custom-control-label' for='"+data._id+"'></label></div>"
                }
            },
            {
                data:null,
                render:function(data,type,row){
                    return "<button class='btn btn-danger btn-circle btn-sm' id='"+data._id+"' onClick='deleteEvent(this.id)'><i class='fas fa-trash'></i></button>"
                }
            }
            ]
        });
        //Table end
        // $('#customSwitch1').prop('checked',false)
        //Add event Modal
        $('#AddEventButton').click(function(e){
            e.preventDefault()

            //Build new modal
            create_modal()
            $('#rulesCount').val('1')

            //Show the modal
            $('#EvtModal').modal()

            //Custom view changes
            $('#submitModal').text('ADD')
            $('#EvtModalHead').text('Add Event')
        })

        //On click - Modal in table
        $('#eventDataTable tbody').on('click','tr',function(e){
            if(e['target']._DT_CellIndex == undefined || e['target']._DT_CellIndex['column']>6) return  //Disable click on last column
            e.preventDefault()
            var data = table.row( this ).data()

            //Create new one
            create_modal()

            //Build new modal
            $('#EvtModal').modal()
            $('#eventID').val(data._id)
            $('#EvtModalHead').text('Edit Event')
            $('#eventName').val(data.name)
            $('#evtDescription').val(data.description)
            $('#type_select').val(data.type)
            $('#submitModal').text('EDIT')
            
            var isEmailCheck = (data.alerts['email'] === "true") //Convert to boolean
            $('#AlertEmail').prop('checked',isEmailCheck)

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

        // Buttons in Modal
            /// Since each action we remove modal and re-build it, 
            ///      we need to add listener to static div parent
        document.getElementById("EvtModal").addEventListener("click", function(event) {

            //Add more rules in modal
            if ( event.target.id === 'addMore') {
            //Manage counting
            const rule_count = $('#rulesCount').val()
            let int_rule_count = Number(rule_count)
            int_rule_count++
            let rule_index = Number(int_rule_count)
            rule_index-- 

            $( "#event_creation_details" ).append( "<div class='form-row'> <div class='col-md-4 mb-3'> <input type='number' class='form-control' id='ruleID"+rule_index+"' placeholder='#' id='Rule ID' name='Rule ID' autocomplete='off' required> <div class='valid-tooltip'> Looks good! </div></div><div class='col-md-4 mb-3'> <input type='number' class='form-control' id='ruleRepeat"+rule_index+"' placeholder='1 or more' value='1' id='repeated' name='repeated' autocomplete='off' required> <div class='valid-tooltip'> Looks good! </div></div><div class='col-md-4 mb-3'> <div class='input-group'> <input type='number' class='form-control' id='ruleTimeout"+rule_index+"' placeholder='In seconds' aria-describedby='validationTooltipUsernamePrepend' id='TIMEOUT' name='TIMEOUT' autocomplete='off' required> <div class='invalid-tooltip'> Please choose timeout bigger then 0 </div></div></div></div>" );
            $('#rulesCount').val(int_rule_count)
            }

            //Submit the form
            if ( event.target.id === 'submitModal'){
                const getJsonReady ={}
                var postUrl = '/api/policy/postEvents' 
                //Check if its new event or edited
                if($('#eventID').val()){
                    getJsonReady['_id'] = $('#eventID').val()
                    postUrl = '/api/policy/editEvent'
                }
                
                //Regular values
                getJsonReady['name'] = $('#eventName').val()
                getJsonReady['description'] = $('#evtDescription').val()
                getJsonReady['type'] = $('#type_select').val()
                getJsonReady['status'] = true
                
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
                      rule_id: ($('#ruleID'+i).val()),
                      repeated: $('#ruleRepeat'+i).val(),
                      timeout: $('#ruleTimeout'+i).val()
                    })
                }
                $.ajax({
                    type: 'POST',
                    url:postUrl,
                    data: getJsonReady,
                    'Content-Type': "application/json",
                    complete:function(){
                        $('#EvtModal').modal("hide")
                        $('#rulesCount').val('1')
                        location.reload()
                    }
                })
            }
       });

    }); //end document
}).done(()=>{
    $('#loadingIcon').remove()
}) //end json


function create_modal(){
    $('.modal-body').remove()
    $('#modal-body-cover').append(" <div class='modal-body'> <div class='input-group-prepend-users'> <div class='input-group-text-users'>Event ID</div></div><input type='number' class='form-control input-users' id='eventID' name='eventID' autocomplete='off' disabled> <div class='input-group-prepend-users'> <div class='input-group-text-users'>Name</div></div><input type='text' class='form-control input-users' id='eventName' name='eventName' autocomplete='off' required> <div class='input-group-prepend-users'> <div class='input-group-text-users'>Description</div></div><input type='text' class='form-control input-users' id='evtDescription' name='Description' size='38' autocomplete='off' required> <div class='input-group-prepend-users'> <div class='input-group-text-users'>Type</div></div><div class='form-row'> <select type='text' id='type_select' name='type_select' class='form-control input-users-dropdown' autocomplete='off' required> <option value='Local' selected>Local</option> <option value='Global'>Global</option> </select> <div class='col-lg-1 ' style='display: none;'> <input class='form-control' type='number' id='rulesCount' value='1' autocomplete='off' disabled> </div></div><br><div class='input-group-prepend-users'> <div class='input-group-text-users'>Alert Options</div></div><div class='form-check form-check-inline'> <input class='form-check-input' type='checkbox' id='AlertEmail' value='email' autocomplete='off'> <label class='form-check-label' for='inlineCheckbox1'>Email</label> </div><div class='form-check form-check-inline'> <input class='form-check-input' type='checkbox' id='AlertSMS' value='sms' autocomplete='off' disabled> <label class='form-check-label' for='inlineCheckbox2'>SMS</label> </div><div class='form-check form-check-inline'> <input class='form-check-input' type='checkbox' id='AlertApp' value='app' autocomplete='off' disabled> <label class='form-check-label' for='inlineCheckbox3'>Application</label> </div><br><div id='event_creation_details'> <div class='form-row'> <div class='col-md-4 mb-3'> <label>Rule ID</label> <input type='number' class='form-control' id='ruleID0' placeholder='#' name='Rule ID' autocomplete='off' required> </div><div class='col-md-4 mb-3'> <label>Repeated</label> <input type='number' class='form-control' id='ruleRepeat0' placeholder='1 or more' value='1' name='repeated' autocomplete='off' required> </div><div class='col-md-4 mb-3'> <label>Timeout</label> <div class='input-group'> <input type='number' class='form-control' id='ruleTimeout0' placeholder='In seconds' aria-describedby='validationTooltipUsernamePrepend' name='TIMEOUT' autocomplete='off' required> </div></div></div></div><button class='btn btn-outline-primary btn-user btn-block;input-group-text' href='#' id='addMore'>Add Rule</button> </div>")
}

function deleteEvent(id){
    $('#EvtModal').modal({show:false})
    var jsonFormat = { }
    jsonFormat['_id'] = id
    $.ajax({
     type: 'POST',
     url:'/api/policy/deleteEvent',
     data: jsonFormat,
     'Content-Type': "application/json",
     complete:function(data){
         location.reload()
     }
 })
}

function viewRules(){
    $.getJSON('/api/policy/data2table',function(data){
            $('#RuleDataTable').DataTable({
                orderCellsTop: true,
                fixedHeader: true,
                destroy:true,
                data:data,
                dom:"<'myfilter'f>",
                "bLengthChange" : false,
                "pageLength": 5,
                columns: [
                    {data: '_id'},
                    {data: 'name'},
                    {data: 'field'},
                    {data: 'value'}
                ]
            });     
        });
}

function toggleEvent(data){
    const details_to_send = {}
    details_to_send['_id'] = data.id
    details_to_send['enable'] = data.checked
    $.post('/api/policy/statusEvent',details_to_send)
}