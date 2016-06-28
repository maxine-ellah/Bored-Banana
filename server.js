var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs')
var bananas = require('./banana.JSON')
var moment = require('moment')
var Knex = require('knex')

var knexConfig = require('./knexfile')
var env = process.env.NODE_ENV || 'development'
var knex = Knex(knexConfig[env])

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('client'));

app.get('/', function (req, res) {
  res.render('index');
});



app.post('/', function (req, res) {
  console.log('this is server req.body: ', req.body)
  knex('bananas')
  .insert({quantity: req.body.quantity, dateBought: req.body.dateBought, cost: req.body.cost, timeEntered: moment()})
  .then(function (data) {
    console.log('data from knex insert: ', data)
  })
    res.send('ok')
    })


app.get('/bananas', function (req, res) {
  knex.select()
  .from('bananas')
  .then(function(data){
    console.log('data from knex select: ', data);
    res.json(data)
  })
})

app.get('/bananas/:id', function (req, res) {
  console.log("req.params: ", req.params);
  knex('bananas')
  .where({id: req.params.id})
  .then(function(data){
    res.json(data[0]);
  })
})

//
// app.get('/bananas/:id', function (req, res) {
//   //grab the banana from the json file by it's id,
//   fs.readFile('banana.JSON', 'utf8', function(err, data) {
//     if (err) {
//     console.log(err)
//   }
//     // console.log("req.params: ", req.params, "data: ", data)
//
//     var bananaId = req.params.id -1
//     var selectedBanana = JSON.parse(data)[bananaId]
//     console.log('selectedBanana: ', selectedBanana)
//     res.json(selectedBanana)
//
//   })
// })


app.listen(3000, function () {
  console.log('A Bored Banana is listening on port 3000!');
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
