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
  console.log('this is server receiving the post', req.body)
  fs.readFile('test.JSON', 'utf8', function(err, data) {

    // turn the data (which is a string) from JSON into an object.
    //var dataObject =  JSON.parse(data)

    // join that object with the req.body that came in
    //var dataToSave = dataObject + req.body
    //console.log('dataObject: ', dataObject, 'req.body: ', req.body, 'dataToSave: ', dataToSave)

    //var quantity = req.body[0].
    var obj = createNewObj(req.body[0].value, req.body[1].value, req.body[2].value)
    // write the result
    console.log('this is obj: ', obj)

    fs.writeFile('test.JSON', JSON.stringify(obj), function(err){
      if (err) console.log (err)
      console.log('wrote file fine')
    })

  })

  // res.send('bananaStats', req.body)
  res.send('ok')
})

app.post('/banana', function (req, res) {
  console.log(req.body)
   res.render('bananaStats', req.body)
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

function createNewObj(givenQuantity, givenDateBought, givenCost) {
  var newObj = {}
  newObj.quantity = givenQuantity
  newObj.dateBought = givenDateBought
  newObj.cost = givenCost
  return newObj
}



