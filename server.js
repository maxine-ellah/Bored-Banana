var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var moment = require('moment')
var bcrypt = require('bcrypt-node')
var Knex = require('knex')
var session = require('express-session');


var knexConfig = require('./knexfile')
var env = process.env.NODE_ENV || 'development'
var knex = Knex(knexConfig[env])

app.use(express.static('client'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({ secret: 'cinnamon bun', resave: false, saveUninitialized: false }))

function getUserId () {
  return knex('users').max('userId')
}

// app.get('/', function (req, res) {
//   console.log('req.session in /', req.session);
//   res.render('index');
// });


app.post('/login', function (req, res) {

  console.log('req.body in login route: ', req.body); //production console.logs to check
  console.log('req.session in login route: ', req.session);//login and session data.

  knex('users')
  .where({email: req.body.email})
  .then(function(data) {
    console.log('data in where clause in /login: ', data)
    if (bcrypt.compareSync(req.body.password, data[0].hashedPassword)) {
      req.session.userId = data[0].userId
      req.session.save()
      console.log('req.session', req.session);
      console.log('user number ' + data[0].userId + ' has successfully logged in!!');
      res.sendStatus(200)
    }
  })
  .catch(function(err){
      console.log('error: ', err)
      res.sendStatus('403')
  })
})

app.get('/logout', function (req, res) {
  console.log('u have logged out!');
  req.session.destroy()
  console.log('req.session after logout: ', req.session);
  res.redirect('/')
})

app.post('/signUp', function (req, res) {
  var hash = bcrypt.hashSync(req.body.password)
  knex('users')
  .whereIn('name', req.body.name)
  .then(function(data){
    if (data.length !== 0){
      console.log('data in /signUp: ', data);
      res.send('Sorry, that username is taken. Please choose another one.')
    } else {
      knex('users')
      .insert({name: req.body.name, email: req.body.email, hashedPassword: hash})
      .then(function() {
        return getUserId()
      })
      .then(function(data) { //perhaps write function to set and save session here
        req.session.userId = data[0].max
        req.session.save()
        console.log('user ' + req.session.userId + ' successfully signed up!');
        return res.json(data)
      })
      }
  })
  .catch(function(err){
    console.log('error: ', err);
    res.send('Please, refresh the page and try again.')
  })
})


app.post('/', function (req, res) {

  console.log('req.session in / post route: ', req.session);
  console.log('this is server req.body: ', req.body)

  if(!req.session.userId){
    console.log('You need to log in!');
    res.redirect('/')
  } else {
    knex('bananas')
    .insert({userId: req.session.userId, quantity: req.body.quantity, dateBought: moment(req.body.dateBought).format("dddd, MMMM Do YYYY"), cost: req.body.cost, timeEntered: moment()})
    .then(function (data) {
      console.log('req.session after knex insert: ', req.session)
    })
      res.send('ok')
      }
  })



app.get('/bananas', function (req, res) {

  console.log('req.session in /bananas route: ', req.session);

  if(!req.session.userId){
    console.log('You need to log in!');
    res.redirect('/')
  } else {
    knex.select()
    .from('bananas')
    .then(function(data){
      console.log('data from knex select: ', data);
      console.log('req.session after knex insert: ', req.session)
      res.json(data)
    })
  }
})


app.get('/bananas/:id', function (req, res) {

  console.log('req.session in /bananas/:id route: ', req.session);
  console.log("req.params in /bananas/:id route: ", req.params);

  knex('bananas')
  .where({id: req.params.id})
  .then(function(data){
    console.log('req.session after knex insert: ', req.session)
    res.json(data[0]);
  })
})


app.listen(3000, function (req, res) {
  console.log('A Bored Banana is listening on port 3000!');
});

module.exports = app;
