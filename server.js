var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs')
var bananas = require('./banana.js')
var moment = require('moment')
// var timerPage = require('./views/timerPage.hbs')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('client'));

app.get('/', function (req, res) {
  res.render('index');
});

app.post('/', function (req, res) {
  console.log('this is server receiving the post', req.body)

  fs.readFile('banana.js', 'utf8', function(err, data) {
    console.log('this is data: ', data)

    // turn the data (which is a string) from JSON into an object.
    var dataObject =  JSON.parse(data)
    console.log('dataObject: ', dataObject)

    // call the createNewObj function with new data enetered in the form, to
    // create new object
    var obj = createNewBananaObj(dataObject.length +1, req.body[0].value, req.body[1].value, req.body[2].value)
     console.log('this is obj: ', obj)


    // join that object with the req.body that came in
    var dataToSave = dataObject.concat(obj)
      console.log('dataToSave: ', dataToSave, 'dataToSaves type: ', typeof dataToSave)


    // write the result
    fs.writeFile('banana.js', JSON.stringify(dataToSave), function(err){
      if (err) console.log (err)
      console.log('wrote file fine')
    })
  })

  // res.send('bananaStats', req.body)
  res.send('ok')
})

app.get('/bananas', function (req, res) {
  fs.readFile('banana.js', 'utf8', function(err, data) {
  if (err) {
    console.log(err)
  }
   res.json(JSON.parse(data))
  })
})

app.get('/bananas/:id', function (req, res) {
  //grab the banana from the json file by it's id,
  fs.readFile('banana.js', 'utf8', function(err, data) {
    if (err) {
    console.log(err)
  }
    var paramsId = req.params.id
    var selectedBanana = JSON.parse(data)[paramsId -1]
    console.log('selectedBanana: ', selectedBanana)

  // then find out when its inputted date is
  // then calculate the amout of time left that banana has before it goes bad
  var time = calculateTimeLeft(selectedBanana.timeEntered)
  // then, render timer page and pass in amount of time left to the page

  // server side - with an href in the button on the bananas view
  // returning a whole view, with info in it
  console.log(time)
  res.render('timerPage', { time: time })

  // client side, returning just an object
  // the client now puts that info into the view itself
  // res.json(JSON.parse(time))
  // console.log(selectedBanana.dateBought)
  // res.json(time)
  })
})


function calculateTimeLeft(timeEntered) {
  // var a = moment().format()
  // var b = moment(Number(timeEntered))
  // var difference = a.diff(b, 'hours')
  // console.log(difference)
  // var now = moment();
  var tEntered = moment(timeEntered);
  var inSevenDayz = moment([2016, 3, 22])
  return inSevenDayz.to(tEntered, 'days')
  // return difference
}


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


function createNewBananaObj(givenId, givenQuantity, givenDateBought, givenCost) {
  var newObj = {}
  newObj.id = givenId
  newObj.quantity = givenQuantity
  newObj.dateBought = givenDateBought
  newObj.cost = givenCost
  newObj.timeEntered = moment()
  return newObj
}






// app.get('/bananas/:id', function (req, res) {
//   //grab the banana from the json file by it's id,
//   fs.readFile('banana.js', 'utf8', function(err, data) {
//     if (err) {
//     console.log(err)
//   }
//     var paramsId = req.params.id
//     var selectedBanana = JSON.parse(data)[paramsId -1]
//     console.log('selectedBanana: ', selectedBanana)

//   // then find out when its inputted date is
//   // then calculate the amout of time left that banana has before it goes bad
//   var time = calculateTimeLeft(selectedBanana.dateBought)
//   // then, render timer page and pass in amount of time left to the page

//   // server side - with an href in the button on the bananas view
//   // returning a whole view, with info in it
//   // res.render('timerPage', { time: time })

//   // client side, returning just an object
//   // the client now puts that info into the view itself
//   // res.json(JSON.parse(time))
//   console.log(selectedBanana.dateBought)
//   res.json(time)
//   })
// })


