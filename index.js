var request = require('superagent')
var $ = require('jquery')

console.log('bundled js is working')



$("button").click(function(){
    var x = $("form").serializeArray();
    $.each(x, function(i, field){
        $("#results").append(field.name + ":" + field.value + " ");
    });
});

