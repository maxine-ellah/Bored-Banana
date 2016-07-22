var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var moment = require('moment')
var bcrypt = require('bcrypt-node')
var Knex = require('knex')
var session = require('express-session');
var port = process.env.PORT || 3000

var knexConfig = require('./knexfile')
var env = process.env.NODE_ENV || 'development'
var knex = Knex(knexConfig[env])

app.use(express.static('client'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(require('cookie-parser')())
app.use(session({ secret: 'cinnamon bun', resave: false, saveUninitialized: false }))


function getUserId () {
  return knex('users').max('userId')
}


app.post('/login', function (req, res) {
  knex('users')
  .where({email: req.body.email})
  .then(function(data) {
    if (bcrypt.compareSync(req.body.password, data[0].hashedPassword)) {
      req.session.userId = data[0].userId
      req.session.save()
      res.sendStatus(200)
    } else {
      res.sendStatus(403)
    }
  })
  .catch(function (err) {
    res.sendStatus(403)
  })
})// close /login route


app.get('/logout', function (req, res) {
  req.session.destroy()
  res.redirect('/')
})// close /logout route


app.post('/signUp', function (req, res) {
  var hash = bcrypt.hashSync(req.body.password)
  knex('users')
  .whereIn('name', req.body.name)
  .then(function(data){
    if (data.length !== 0){
      res.sendStatus(403)
    } else {
      knex('users')
      .insert({name: req.body.name, email: req.body.email, hashedPassword: hash})
      .then(function() {
        return getUserId()
      })
      .then(function(data) { //perhaps write function to set and save session here
        req.session.userId = data[0].max
        req.session.save()
        return res.json(data)
      })
      }
  })
  .catch(function(err){
    res.send('Please, refresh the page and try again.')
  })
})// close /signUp route


app.post('/bananas/new', function (req, res) {
  if(!req.session.userId){ //REFACTOR - perhaps write a function to check user is in session
    res.redirect('/')
  } else {
    knex('bananas')
    .insert({userId: req.session.userId, quantity: req.body.quantity, dateBought: req.body.dateBought, cost: req.body.cost, timeEntered: moment()})
    .then(function () {
      res.sendStatus(200)
    })
    .catch(function(err) {
    })
    }
  })// close /bananas/new route


app.get('/bananas', function (req, res) {
  if(!req.session.userId){ //REFACTOR - perhaps write a function to check user is in session
    res.redirect('/')
  } else {
    knex.from('bananas').where({userId: req.session.userId}) //only selects bananas which match userId in session
    .then(function(data){ //the userID in the session
      res.json(data)
    })
  }
})// close /bananas route


app.get('/bananas/:id', function (req, res) {
  knex('bananas')
  .where({id: req.params.id})
  .then(function(data){
    res.json(data[0]);
  })
})// close /bananas/:id route


app.listen(port, function () {
  console.log('A Bored Banana is listening on port 3000!');
});

module.exports = app;
