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

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('client'));

app.use(session({ secret: 'cinnamon bun', resave: false, saveUninitialized: false }))


function getUserId () {
  return knex('bananas').max('userId')
}

app.get('/', function (req, res) {
  res.render('index');
});

app.post('/signUp', function (req, res) {
  var hash = bcrypt.hashSync(req.body.password)
  knex('users')
  .whereIn('name', req.body.name)
  .then(function(data){
    if(data.length !== 0){
      res.redirect('/')
    } else {
      knex('users')
      .insert({name: req.body.name, email: req.body.email, hashedPassword: hash})
      .then(function() {
        return knex('users').max('userId')
      })
      .then(function(data) {
        req.session.userId = data[0].max
        req.session.save()
        console.log('user ' + req.session.userId + ' is in session!');
        res.redirect('/')
      })
      }
  })
  .catch(function(err){
    console.log('error: ', err);
    res.redirect('/')
  })
})

app.post('/login', function (req, res) {
  console.log('req.body in login route: ', req.body);
  if(req.body.email === '') { //first if to handle any empty string entered
    console.log('no email entered!'); //as email
    return res.redirect('/')
  }
  knex('users')
  .where({email: req.body.email})
  .then(function(data) {
    console.log('data in where clause in /login: ', data)
    if (bcrypt.compareSync(req.body.password, data[0].hashedPassword)){
      req.session.userId = data[0].userId
      req.session.save()
      console.log('user number ' + data[0].userId + ' has successfully logged in!!');
      res.redirect('/')
    } else {
      console.log('incorrect password!')
      res.redirect('/')
      }
  })
  .catch(function(err){
    console.log('error: ', err)
    res.sendStatus(403)
  })
})

app.get('/logout', function (req, res) {
  console.log('u have logged out!');
  req.session.destroy()
  console.log('req.session after logout: ', req.session);
  res.redirect('/')
})

app.post('/', function (req, res) {
  console.log('this is server req.body: ', req.body)
  if(!req.session.userId){
    console.log('You need to log in!');
    res.redirect('/')
  } else {
    knex('bananas') //also want to insert userId in table here, which is stored in req.session.userId
    .insert({userId: req.session.userId, quantity: req.body.quantity, dateBought: moment(req.body.dateBought).format("dddd, MMMM Do YYYY"), cost: req.body.cost, timeEntered: moment()})
    .then(function (data) {
      console.log('req.session after knex insert: ', req.session)
    })
      res.send('ok')
      }
  })



app.get('/bananas', function (req, res) {
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
  console.log("req.params: ", req.params);
  knex('bananas')
  .where({id: req.params.id})
  .then(function(data){
    console.log('req.session after knex insert: ', req.session)
    res.json(data[0]);
  })
})


app.listen(3000, function () {
  console.log('A Bored Banana is listening on port 3000!');
});

module.exports = app;
