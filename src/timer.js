var $ = require("jquery")
var moment = require("moment")


var intervalID = setInterval(timerFunction, 1000)

var dateBought = moment(document.getElementById('time').innerHTML, "YYYY-MM-DD")

var endTime = moment(dateBought).add(7, 'day')

function timerFunction() {
  if (!document.getElementById('time')) {
    clearInterval(intervalID)
  }

  var days = moment.duration(endTime - moment()).days()
  var hours = moment.duration(endTime - moment()).hours()
  var minutes = moment.duration(endTime - moment()).minutes()
  var seconds = moment.duration(endTime - moment()).seconds()

  if (days <= 1 && hours <= 1 && minutes <= 1 && seconds <= 1) {
    days = 0
    hours = 0
    minutes = 0
    seconds = 0
    clearInterval(intervalID)
    alert("Your bananas are old, put them in the freezer.")
  }

  displayTimer(days, hours, minutes, seconds)

}

function displayTimer(days, hours, minutes, seconds){
  document.getElementByTagNames('h3').innerHTML = (days + " days " + hours + " hours " + minutes + " minutes " + seconds + " seconds ")
}
