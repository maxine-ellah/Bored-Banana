var bananaStats = require('./views/bananaStats.hbs')
var timerPage = require('./views/timerPage.hbs')
var request = require('superagent')
var $ = require('jquery')




    $("button#addBananaData").click(function(){
      var formData = $("form").serializeArray();

      request
        .post('/')
        .send(formData)
        .end(function(err, res) {
          console.log('this is res.body: ', res.body)
        })


      // $.each(x, function(i, field){
      //     $("#results").append(field.name + ":" + field.value + " ");
      // });
      return false;
    });



    $("button#showBananas").click(function(){

      request
        .get('http://localhost:3000/bananas')
        .end(function(err, res){
          document.body.innerHTML = bananaStats({ bananas: res.body });
          // $('.startTimerClient').click(function(){
          //   startTimer($(this).data("id"))
          // })
        })
        return false;
    });


    // request
    //     .get('http://localhost:3000/bananas/'+id)
    //     .end(function(err, res) {
    //       console.log('res sent!', res.body)
    //     })


    // function startTimer(id) {
    //   request
    //     .get('http://localhost:3000/bananas/'+id)
    //     .end(function(err, res) {
    //       // console.log('res sent!', res.body)
    //       document.body.innerHTML = timerPage({ time: res.body })
    //     })
    // }








