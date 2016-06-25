var bananaStats = require('../views/bananaStats.hbs')
//var timerPage = require('./views/timerPage.hbs')
var request = require('superagent')
var $ = require('jquery')

$(document).ready(function(){
  $("button#addBananaData").click(function(){
    addBananaData()
  }); //close listener
}) //close document ready


  function addBananaData() {
    var formData = $("form").serializeArray()
    request
      .post('/')
      .send(formData)
      .end(function(err, res) {
      })
    document.getElementById("form").reset()
    return false;
  }





    $("button#showBananas").click(function(){

      request
        .get('http://localhost:3000/bananas')
        .end(function(err, res){
          document.body.innerHTML = bananaStats({ bananas: res.body });
        })
        return false;
    });
