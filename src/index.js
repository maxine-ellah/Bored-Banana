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
        console.log('res.body', res.body);
        document.body.innerHTML = bananaStats({ bananas: res.body })
        $(".startTimerServer").click(function(){
          console.log($(this).data("id"));
          startTimer($(this).data("id"))
        })
      });
  }

  function startTimer(id){
    request
    .get('http://localhost:3000/bananas/' + id)
    .end(function(err, res){
      console.log('res.body in startTimer function: ', res.body)
      $('body').html(timerPage(res.body))
      $('#backBtn').click(function(){
        showBananaData()
      })
    })
  }
