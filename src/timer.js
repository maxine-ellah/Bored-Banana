var $ = require("jquery")
var moment = require("moment")




var timeEntered = moment($("#time").text())
var endTime = moment(timeEntered).add(7, 'day')
// var remainingTime = moment.duration(timeEntered.to(endTime))
// var remainingTime = moment.duration(endTime - timeEntered).hours()
// console.log("remainingTime: ", remainingTime)
// var remainingTime = endTime - moment()
var remainingTime = endTime.diff(timeEntered, 'seconds')
console.log("timeEntered: ", timeEntered)
console.log(moment.duration(endTime - moment()).days(), moment.duration(endTime - moment()).hours(), moment.duration(endTime - moment()).minutes(), moment.duration(endTime - moment()).seconds())
console.log("remainingTime: ", remainingTime)



// setInterval() {

// var now = moment()
// remainingTime = endTime - now
// return moment.duration(remainingTime).hours()
// }





















// function calculateTimeLeft(timeEntered) {
//   // var a = moment().format()
//   // var b = moment(Number(timeEntered))
//   // var difference = a.diff(b, 'hours')
//   // console.log(difference)
//   // var now = moment();
//   var timeEnteredMoment = moment(timeEntered);
//   var inSevenDays = moment([2016, 3, 22])
//   var difference = timeEnteredMoment.to(inSevenDays)
//   console.log('difference: ', difference)
//   return difference
// }







// console.log("timeEntered: ", timeEntered)

// var time = document.querySelector('#time').textContent

// console.log("time: ", time)
