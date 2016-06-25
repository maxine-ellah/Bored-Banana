var $ = require("jquery")
var moment = require("moment")


  setInterval(function () {
    var dateBought = moment($("#time"))
    var endTime = moment(dateBought).add(7, 'day')

    var days = moment.duration(endTime - moment()).days()
    var hours = moment.duration(endTime - moment()).hours()
    var minutes = moment.duration(endTime - moment()).minutes()
    var seconds = moment.duration(endTime - moment()).seconds()

    if (days <= 1 && hours <= 1 && minutes <= 1 && seconds <= 1) {
      days = 0
      hours = 0
      minutes = 0
      seconds = 0
      alert("Your bananas are old, put them in the freezer.")
    }

    $("#timeDisplay").text(days + " days " + hours + " hours " + minutes + " minutes " + seconds + " seconds ")

  }, 1000);
