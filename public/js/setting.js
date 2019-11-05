$(document).ready( ()=> {
    // var opts = localStorage.getItem('prod-detail'); // get selected items from localStorage key
    // opts =  opts.split(','); // split result from localstorage to array
    // $('#category_select').val(opts); // select options with array



    // $('#category_select').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
    //     var category = $('#category_select option:selected');
    //     var selected = [];
    //     $(category).each(function(index, brand){
    //         selected.push([$(this).val()]);
    //     });
    //     localStorage.setItem('prod-detail', selected );
    //   });






    const req_filter = {}
    req_filter['_id'] = "basic-setting"
    $.getJSON( '/api/gen/get-setting',req_filter)
    .done((jsonData)=> {
        $("#SystemName").val(jsonData['system-name'])
        $("#TimeToLoad").val(jsonData['time_to_load'])
        $("#XTimeBack").val(jsonData['logs-from-X-hours'])
        $("#BasedOn").val(jsonData['local_based_on'])
    })
})

$("#submit-setting").click(()=>{
    const jsonString = {}
    jsonString['_id'] = "basic-setting"
    jsonString['system-name'] = $("input#SystemName").val()
    jsonString['time_to_load'] = $("input#TimeToLoad").val()
    jsonString['logs-from-X-hours'] = $("input#XTimeBack").val()
    jsonString['local_based_on'] = $("select#BasedOn").val()
    $.ajax({
        type: 'POST',
        url:'/api/gen/update-setting',
        data: jsonString,
        success: ()=>{alert('sent !')},
        'Content-Type': "application/json"
    })

    // Post catergory to DB -Start
    const selected_list =[]
    const select_list = document.getElementById('category_select'),
    options = select_list.options,
    len = options.length;
    for(var i=0;i<len;i++){
        if(options[i].selected)
            selected_list.push(options[i].value)
    }
    const jsonCategory ={}
    jsonCategory['category_select'] = selected_list
    $.ajax({
        type:'POST',
        url: '/api/policy/category_select',
        data: jsonCategory,
        'Content-Type': "application/json",
        success: ()=>{console.log('OK!')}
    })
    // Post catergory to DB  - End
})