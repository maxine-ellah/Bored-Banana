var bananaStats = require('../views/bananaStats.hbs')
//var timerPage = require('./views/timerPage.hbs')
var request = require('superagent')
var $ = require('jquery')




    $("button#addBananaData").click(function(){
      var formData = $("form").serializeArray()

      request
        .post('/')
        .send(formData)
        .end(function(err, res) {
          console.log('this is res.body: ', res.body)
        })
        document.getElementById("form").reset()

      return false;
    });



    $("button#showBananas").click(function(){

      request
        .get('http://localhost:3000/bananas')
        .end(function(err, res){
          document.body.innerHTML = bananaStats({ bananas: res.body });
        })
        return false;
    });
