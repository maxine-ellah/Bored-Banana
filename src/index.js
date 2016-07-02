var bananaStats = require('../views/bananaStats.hbs')
var timerPage = require('../views/timerPage.hbs')
var loginPage = require('../views/login.hbs')
var signUpPage = require('../views/signUp.hbs')
var bananaEntry = require('../views/bananaEntry.hbs')
var request = require('superagent')
var $ = require('jquery')

$(document).ready(function(){
  loginPage()
  console.log('hitting doc ready');

  $("button#signUp").click(function(){
    renderSignUp()
  }) //close signUp listener

  $("button#login").click(function(){
    submitLogin()
  }) //close login listener

  $("body").click(function(e) {
    if(e.target.id === "submitSignUp") {
      e.target.addEventListener('click', submitSignUp(), false)
      e.preventDefault()
    } //close if statement
    if(e.target.id === "logout") {
      e.target.addEventListener('click', submitLogout(), false)
      e.preventDefault()
    }//close logout listener
    if(e.target.id === "addBananaData") {
      e.target.addEventListener('click', addBananaData(), false)
      e.preventDefault()
    }//close addBanana listener
    if(e.target.id === "showBananas") {
      e.target.addEventListener('click', showBananaData(), false)
      e.preventDefault()
    }//close showBananas listener

  }) //close submitSignUp listener


  // $("button#addBananaData").click(function(){
  //   console.log('add banana button');
  //   addBananaData()
  // })

  $("button#showBananas").click(function(e){
    showBananaData()
    e.preventDefault()
  }) //close showBananas listener



  function submitLogin() {
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value

    if (email.length === 0 || password.length === 0) {
      document.getElementById("header").innerHTML = "Please fill all fields bitch."
      return
    }

    var loginFormData = {email: email, password: password}

    request
    .post('/login')
    .send(loginFormData)
    .end(function(err, res) {
      console.log('res in client /login: ', res);
      console.log('err in client /login: ', err);
      if(res.status === 200){
        $('body').html(bananaEntry)
      } else {
        document.getElementById("error").innerHTML = "Oops, there was an error. Please try again."
      }
    })
  }

  function renderSignUp() {
    $('body').html(signUpPage)
  }

  function submitSignUp() {
    var name = document.getElementById('name').value
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value

    if (name.length === 0 || email.length === 0 || password.length === 0) {
      document.getElementById("header").innerHTML = "Please fill all fields bitch."
      return
    }

    var signUpFormData = {name: name, email: email, password: password}

    request
    .post('/signUp')
    .send(signUpFormData)
    .end(function(err, res){
      $('body').html(bananaEntry)
    })
  }


  function submitLogout() {
    console.log('submitLogout button');

    request
    .get('/logout')
    .end(function(err, res){
      console.log('User logged out!');
    })
  }


  function addBananaData() {
    var quantity = document.getElementById('quantity').value
    var dateBought = document.getElementById('dateBought').value
    var cost = document.getElementById('cost').value

    var formData = {quantity: quantity, dateBought: dateBought, cost: cost}

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
        $('#backBtn').click(function(){
        $('body').html(bananaEntry)
        })
        $(".startTimerServer").click(function(){
          startTimer($(this).data("id"))
        })
      });
  }

  function startTimer(id){
    request
    .get('http://localhost:3000/bananas/' + id)
    .end(function(err, res){
      console.log('res.body: ',res.body);
      $('body').html(timerPage(res.body))
      $('#backBtn').click(function(){
        showBananaData()
      })
    })
  }

}) //close document ready
