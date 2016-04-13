var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('client'));

app.get('/', function (req, res) {
  res.render('index');
});

app.post('/', function (req, res) {
  console.log(req.body)
  fs.writeFile('banana.js', req.body, function(err){
    if (err) console.log (err)
  })
  res.send('bananaStats', req.body)
})

app.post('/banana', function (req, res) {
  console.log(req.body)
   res.render('bananaStats', req.body)
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
