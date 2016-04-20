var $ = require("jquery")


var timeEntered = $("#time").text()

// console.log("timeEntered: ", timeEntered)

// var time = document.querySelector('#time').textContent

// console.log("time: ", time)

var remainingTime =


function calculateTimeLeft(timeEntered) {
  // var a = moment().format()
  // var b = moment(Number(timeEntered))
  // var difference = a.diff(b, 'hours')
  // console.log(difference)
  // var now = moment();
  var timeEnteredMoment = moment(timeEntered);
  var inSevenDays = moment([2016, 3, 22])
  var difference = timeEnteredMoment.to(inSevenDays)
  console.log('difference: ', difference)
  return difference
}
