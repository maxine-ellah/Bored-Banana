var $ = require("jquery")
var moment = require("moment")




var timeEntered = moment($("#time").text())
var endTime = moment([2016, 3, 22])
// var remainingTime = moment.duration(timeEntered.to(endTime))
var remainingTime = moment.duration(endTime - timeEntered)
// console.log("remainingTime: ", remainingTime)
console.log("timeEntered: ", timeEntered)
console.log("endTime: ", endTime)
console.log("remainingTime: ", remainingTime)


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







// console.log("timeEntered: ", timeEntered)

// var time = document.querySelector('#time').textContent

// console.log("time: ", time)
