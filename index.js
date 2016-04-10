var bananaStats = require('./views/bananaStats.hbs')
var request = require('superagent')
var $ = require('jquery')


// request
//   .get('http://localhost:3000/')
//   .end(function(err, res){
//   console.log('this is res.body', res.body)
//   document.body.innerHTML = bananaStats({banana: res.body})
    $("button").click(function(){
      var x = $("form").serializeArray();
      $.each(x, function(i, field){
          $("#results").append(field.name + ":" + field.value + " ");
      });
  });
    
// });

