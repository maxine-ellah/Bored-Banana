var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs')
var bananajs = require('./banana.JSON')

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

  fs.readFile('banana.JSON', 'utf8', function(err, data) {
    console.log('this is data: ', data)

    // turn the data (which is a string) from JSON into an object.
    var dataObject =  JSON.parse(data)
    console.log('dataObject: ', dataObject)

    // call the createNewObj function with new data enetered in the form, to
    // create new object
    var obj = createNewObj(req.body[0].value, req.body[1].value, req.body[2].value)
     console.log('this is obj: ', obj)

    // join that object with the req.body that came in
    var dataToSave = dataObject.concat(obj)
      console.log('dataToSave: ', dataToSave, 'dataToSaves type: ', typeof dataToSave)


    // write the result
    fs.writeFile('banana.JSON', JSON.stringify(dataToSave), function(err){
      if (err) console.log (err)
      console.log('wrote file fine')
    })
  })

  // res.send('bananaStats', req.body)
  res.send('ok')
})

app.get('/banana', function (req, res) {
  console.log(req.body)
   res.json( bananajs )
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



