// var bananaStats = require('./views/bananaStats.hbs')
var request = require('superagent')
var $ = require('jquery')


// request
//   .post('http://localhost:3000/')
//   .end(function(err, res){
//   console.log('this is res.body', res.body)

    $("button").click(function(){
      console.log("this is working")
      var x = $("form").serializeArray();
      $.each(x, function(i, field){
          $("#results").append(field.name + ":" + field.value + " ");
      });
      return false;
  });

// });

//   document.body.innerHTML = bananaStats({banana: res.body})
