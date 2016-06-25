var bananaStats = require('../views/bananaStats.hbs')
//var timerPage = require('./views/timerPage.hbs')
var request = require('superagent')
var $ = require('jquery')

$(document).ready(function(){
  $("button#addBananaData").click(function(){
    addBananaData()
  }) //close addBanana listener
  $("button#showBananas").click(function(e){
    e.preventDefault();
    showBananaData()
  }) //close showBananas listener

}) //close document ready


  function addBananaData() {
    var formData = $("form").serializeArray()
    request
      .post('/')
      .send(formData)
      .end(function(err, res) {
        document.getElementById("form").reset()
      })
  }


  function showBananaData() {
    request
      .get('http://localhost:3000/bananas')
      .end(function(err, res) {
        console.log(err);
        document.body.innerHTML = bananaStats({ bananas: res.body })
      });
  }
