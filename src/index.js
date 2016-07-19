var bananaStats = require('../views/bananaStats.hbs')
var timerPage = require('../views/timerPage.hbs')
var loginPage = require('../views/login.hbs')
var signUpPage = require('../views/signUp.hbs')
var bananaEntry = require('../views/bananaEntry.hbs')
var request = require('superagent')
var $ = require('jquery')
var moment = require('moment')

//===listeners on HTML===//

$(document).ready(function(){
  loginPage()
  console.log('hitting doc ready');

  $("button#signUp").click(function(){
    renderSignUp()
  }) //close signUp listener

  $("button#login").click(function(){
    submitLogin()
  }) //close login listener

  //===listeners on HTML END===//


  //===listeners on hbs views===//

  $("body").click(function(e) {
    if(e.target.id === "submitSignUp") {
      e.target.addEventListener('click', submitSignUp(), false)
      e.preventDefault()
    } //close submitSignUp listener

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
  }) //close body listener

  //===listeners on hbs views END===//


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
  } // close submitLogin function


  function renderSignUp() {
    $('body').html(signUpPage)
  } //close renderSignUp function


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
      if(res.status === 200) {
        $('body').html(bananaEntry)
      } else {
        document.getElementById("signUpError").innerHTML = "Oops, that name is taken. Please try again."
      }
    })
  } //close submitSignUp function


  function submitLogout() {

    request
    .get('/logout')
    .end(function(err, res){
      console.log('User logged out!');
    })
  } //close submitLogout function


  function addBananaData() {
    var quantity = document.getElementById('quantity').value
    var dateBought = document.getElementById('dateBought').value
    var cost = document.getElementById('cost').value

    var formData = {quantity: quantity, dateBought: dateBought, cost: cost}

    request
      .post('/bananas/new')
      .send(formData)
      .end(function(err, res) {
        document.getElementById("bananaForm").reset()
      })
  } //close addBananaData function


  function showBananaData() {
    request
      .get('/bananas')
      .end(function(err, res) {
        console.log('res.body in showBananaData in index.js: ', res.body)
        $('body').html(bananaStats({ bananas: res.body }))

        $('#backBtn').click(function(){
        $('body').html(bananaEntry)
        })

        $(".startTimerServer").click(function(){
          console.log('$(this).data("id")', $(this).data("id"));
          startTimer($(this).data("id"))
        })
      });
  } //close showBananaData function


  function startTimer(id){
    console.log('startTimer(id) route bing hit');
    console.log('id in startTimer(id): ', id);
    request
    .get('/bananas/' + id)
    .end(function(err, res){
      console.log('res.body in startTimer function: ', res.body);
      $('body').html(timerPage(res.body))
      $('#backBtn').click(function(){
        showBananaData()
      })
    })
  } //close startTimer function

}) //close document ready
