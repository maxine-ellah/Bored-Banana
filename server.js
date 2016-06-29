var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs')
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
  .insert({quantity: req.body.quantity, dateBought: moment(req.body.dateBought).format("dddd, MMMM Do YYYY"), cost: req.body.cost, timeEntered: moment()})
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


app.listen(3000, function () {
  console.log('A Bored Banana is listening on port 3000!');
});
