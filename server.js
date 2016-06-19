var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs')
var bananas = require('./banana.JSON')
var moment = require('moment')

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
      // console.log('dataToSave: ', dataToSave, 'dataToSaves type: ', typeof dataToSave)


    // write the result
    fs.writeFile('banana.JSON', JSON.stringify(dataToSave), function(err){
      if (err) console.log (err)
      console.log('wrote file fine')
    })
  })

  // res.send('bananaStats', req.body)
  res.send('ok')
})

app.get('/bananas', function (req, res) {
  fs.readFile('banana.JSON', 'utf8', function(err, data) {
  if (err) {
    console.log(err)
  }
   res.json(JSON.parse(data))
  })
})

app.get('/bananas/:id', function (req, res) {
  //grab the banana from the json file by it's id,
  fs.readFile('banana.JSON', 'utf8', function(err, data) {
    if (err) {
    console.log(err)
  }
    console.log("req.params: ", req.params, "data: ", data)

    var paramsId = req.params.id
    console.log(JSON.parse(data), paramsId)
    var selectedBanana = JSON.parse(data)[paramsId -1]

    res.render('timerPage', { time: selectedBanana.dateBought, cost: selectedBanana.cost })

  })
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


function createNewBananaObj(givenId, givenQuantity, givenDateBought, givenCost) {
  var newObj = {}
  newObj.id = givenId
  newObj.quantity = givenQuantity
  newObj.dateBought = moment(givenDateBought).format()
  // newObj.dateBoughtStamp = moment(givenDateBought)
  newObj.cost = givenCost
  newObj.timeEntered = moment()
  return newObj
}
