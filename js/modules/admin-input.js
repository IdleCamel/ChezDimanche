function makeNewReservation(begin, end) {
	"use strict";
	var dateBegin = begin.split('/');
	var dateEnd = end.split('/');
	var BeginDateObj = new Date(dateBegin[2], dateBegin[1] - 1, dateBegin[0]);
	var EndDateObj = new Date(dateEnd[2], dateEnd[1] - 1, dateEnd[0]);
	var durationDays = (EndDateObj - BeginDateObj) / (24 * 60 * 60 * 1000);
	var beginDay = parseInt(dateBegin[0]);
	var beginMonth = parseInt(dateBegin[1] - 1);
	var beginYear = parseInt(dateBegin[2]);
	console.log(beginMonth);
	console.log(beginYear);
	for (i = beginDay; i < beginDay + durationDays; i += 1) {
		console.log(i);
	  var bookedDate = new Date(dateBegin[2], beginMonth, i).getTime();
	  bookedDates.push(bookedDate);
	}
}

var bookedDates = [];

// reservations 01/07/2016 -> 30/07/2016 included
var i;
for (i = 1; i < 31; i += 1) {
  var bookedDate = new Date(2016, 6, i).getTime();
  bookedDates.push(bookedDate);
}

// reservations 01/08/2016 -> 27/08/2016 included
for (i = 1; i < 28; i += 1) {
  var bookedDate = new Date(2016, 7, i).getTime();
  bookedDates.push(bookedDate);
}

// reservations 19/09/2016 -> 29/09/2016 included
makeNewReservation("19/09/2016", "10/10/2016");