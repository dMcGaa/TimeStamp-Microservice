var express = require('express');
var app = express();

var timeOut = {
  unix: null,
  natural: null
}
var months = ['January', 'Februrary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


// Give Views/Layouts direct access to data.
app.use(function(req, res, next) {
  res.locals.timeOut = timeOut;
  next();
});

app.get('/', function(request, response) {
  //console.log(request.baseUrl);
  console.log("Hello");
  timeOut.unix = null;
  response.render('pages/index')
});

app.get('/*', function(request, response) {
  timeOut.unix = null;
  timeOut.natural = null;
  //console.log(request.baseUrl);
  console.log(request.url);
  var str = request.url;
  str = str.slice(1);
  //console.log(newStr);
  if ((/^\d+$/).test(str)) {
    console.log("is Number");
    if (parseInt(str) >= 1000) {
      var newStr = unixTimeConvert(parseInt(str));
      console.log(newStr);
    }
  }
  else if ((/\W*/).test(str)) {  //was (/\%+/)
    var dateObj = naturalTimeConvert(str);
    console.log("contains \\W");
    console.log(dateObj);

  }
  console.log(str);
  console.log("Not Home");
  response.render('pages/timestamp')
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

function unixTimeConvert(unixTime) {
  var a = new Date(unixTime * 1000);
  //var months = ['January', 'Februrary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var natTime = month + ' ' + date + ', ' + year;
  timeOut.natural = natTime;
  timeOut.unix = unixTime;
  return timeOut;
}

//convert natural time into unix, call unix time, convert
function naturalTimeConvert(natTime) {
  var natArr = natTime.split(/\%\w{2}|\W/);  //was split "%20"
  var natDate = {
    natMonth: null,
    natDate: null,
    natYear: null
  }
  console.log(natArr);
  for (var i = 0; i < natArr.length; i++) {
    if ((/^\d{4}$/).test(natArr[i])) {
      natDate.natYear = parseInt(natArr[i]);
      console.log("year");
    }
    else if ((/^\d{2}$/).test(natArr[i])) {
      natDate.natDate = parseInt(natArr[i]);
      console.log("date");
    }
    else if ((/^[A-Za-z]+$/).test(natArr[i])) {
      var tempStr = natArr[i].charAt(0).toUpperCase() + natArr[i].slice(1).toLowerCase();
      console.log(tempStr);
      if(months.indexOf(tempStr)){
        natDate.natMonth = tempStr;
        console.log("month");
      }
      else{
        natDate.natMonth = "January";
      }
      
    }
  }
  // if(natDate.natDate == null){
  //   natDate.natDate = 1;
  // }
  // if(natDate.natYear == null){
  //   natDate.natYear = 1970;
  // }
  // if(natDate.natMonth == null){
  //   natDate.natMonth = "January";
  // }
  //var unixTime = Date.parse(toString(natDate.natDate)+'-'+natDate.natMonth.slice(0,2)+"-"+toString(natDate.natYear));
  //var strTime = natDate.natDate+'-'+natDate.natMonth.slice(0,3)+"-"+natDate.natYear;
  var newUnixTime = Date.parse(natDate.natDate+'-'+natDate.natMonth.slice(0,3)+"-"+natDate.natYear)/1000;
  console.log(newUnixTime);
  //return natDate;
  var outConver = unixTimeConvert(newUnixTime);
  return newUnixTime;
}
