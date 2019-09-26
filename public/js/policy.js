//event handler function to add more rules
var countRules =1 ;
$("#addMore").click(function(){

   var x = $(".rule_fields_for_duplication:last").clone();
   x.appendTo(".event_creation");  
//x.children(1)[1].value=++countRules;
//x.children(1)[1].style.visibility = 'hidden';
//x.children(0)[0].style.visibility = 'hidden';
//localStorage.setItem('eventID', ++countRules );
});

//category select drop down
    $('#category-select').multiselect({
        selectAllValue: 'multiselect-all',
        onChange: function(element, checked) {
            //assign selected categories into an array
            var category = $('#category-select option:selected');
            var selected = [];
            $(category).each(function(index, brand){
                selected.push([$(this).val()]);
            });
            localStorage.setItem('prod-detail', category );
            console.log(localStorage.getItem('prod-detail'))
    
        }
    });

//verify all fields are full for both RULES&EVENT
function emptyInput(target) {
    if (target=="rule"){

        if(document.getElementById("NameRule").value==="" || document.getElementById("ruleField").value===""
        || document.getElementById("ruleValue").value==="") 
        { 
            document.getElementById('send').disabled = true; 
        } else { 
            document.getElementById('send').disabled = false;
        }
    }
    else{
        if(document.getElementById("ruleNum").value==="" || document.getElementById("repeated").value==="" 
        || document.getElementById("TIMEOUT").value==="" || document.getElementById("eventName").value==="") 
        { 
            document.getElementById('send2').disabled = true; 
        } else { 
            document.getElementById('send2').disabled = false;
        }

    }
}

function exportPolicy(target){
    var site="";
    if(target=="rule"){
        site = "http://localhost:3000/api/policy/data2table"
    }
    else{
        site = "http://localhost:3000/api/policy/eventdata2table"
    }
$(document).ready(function() {
        $.getJSON(site, function(data){
            if(typeof data === "object"){
                data = JSON.stringify(data, undefined, 4)
            }

            var blob = new Blob([data], {type: 'text/json'}),
                e    = document.createEvent('MouseEvents'),
                a    = document.createElement('a')
        
            a.download = 'policy.txt'
            a.href = window.URL.createObjectURL(blob)
            a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
            e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
            a.dispatchEvent(e)
        });
     
    });
}


//store ID number of rules in local storage
// function setIDNum() {
//     var x = localStorage.getItem('prod-detail');
    
//     //localStorage.setItem("IDRuleNum","1");
//     document.getElementById("ruleID").value=localStorage.getItem("IDRuleNum");
//     console.log("ID set to ",localStorage.getItem("IDRuleNum"))
// }

// //increase by 1 ID of rules
// function incRuleID(){
//     var idString = localStorage.getItem("IDRuleNum")
//     var intID = parseInt(idString,10)
//     document.getElementById("ruleID").value=intID
//     console.log("now , " , localStorage.getItem("IDRuleNum"))
//     intID+= 1
//     console.log(intID)
//     localStorage.setItem("IDRuleNum",JSON.stringify(intID))
//     console.log("now , " , localStorage.getItem("IDRuleNum"))
//     //reset fields
//      // $("#NameRule").val("") ;
//     // $("#ruleQuery").val("") ;
    
// }

//verify fields are not empty
