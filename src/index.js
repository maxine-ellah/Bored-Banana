var bananaStats = require('../views/bananaStats.hbs')
var timerPage = require('../views/timerPage.hbs')
var request = require('superagent')
var $ = require('jquery')

$(document).ready(function(){
  $("button#addBananaData").click(function(){
    addBananaData()
  }) //close addBanana listener
  $("button#showBananas").click(function(e){
    showBananaData()
    e.preventDefault()
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
        $('body').html(bananaStats({ bananas: res.body }))
        $("#startTimerServer").click(function(){
          startTimer($(this).data("id"))
        })
      });
  }

  function startTimer(id){
    request
    .get('http://localhost:3000/bananas/' + id)
    .end(function(err, res){
      $('body').html(timerPage(res.body))
      $('#backBtn').click(function(){
        showBananaData()
      })
    })
  }
