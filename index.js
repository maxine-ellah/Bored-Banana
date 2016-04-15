// var bananaStats = require('./views/bananaStats.hbs')
var request = require('superagent')
var $ = require('jquery')




    $("button").click(function(){
      var formData = $("form").serializeArray();

      request
        .post('/')
        .send(formData)
        .end(function(err, res) {
          console.log('this is res.body', res.body)
        })


      // $.each(x, function(i, field){
      //     $("#results").append(field.name + ":" + field.value + " ");
      // });
      return false;
  });

// });

//   document.body.innerHTML = bananaStats({banana: res.body})
