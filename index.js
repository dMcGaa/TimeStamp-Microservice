var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  //console.log(request.baseUrl);
  console.log("Hello");
  response.render('pages/index')
});

app.get('/*', function(request, response) {
  //console.log(request.baseUrl);
  console.log(request.url);
  var str = request.url;
  str = str.slice(1);
  console.log(newStr);
  if((/^\d+$/).test(str)){
    console.log("is Number");
    if (parseInt(str)>=1000){
      var newStr = unixTimeConvert(parseInt(str));
      console.log(newStr);
    }
  }
  else if ((/\\%+/).test(str)){
    var newStr = naturalTimeConvert(str);
    console.log("contains %");
    
  }
  console.log(str);
  console.log("Not Home");
  response.render('pages/index')
});

// //matches only digits (not limited by quantity)
// app.get('/\\d+$', function(request, response) {
//   //console.log(request.baseUrl);
//   console.log("Not Home, Unix");
//   response.render('pages/index')
// });

// //app.get('/\[A-Za-z]+$', function(request, response) {
// app.get('/\[A-Za-z]+$\\%\\d{4}\\,\\%\\d{6}', function(request, response) {
//   //console.log(request.baseUrl);
//   console.log("Not Home, Natural");
//   response.render('pages/index')
// });

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

var timeOut = {
  unix: null,
  natural: null
}

function unixTimeConvert(unixTime){
  var a = new Date(unixTime * 1000);
  var months = ['January','Februrary','March','April','May','June','July','August','September','October','November','December'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var natTime = month + ' ' + date + ', ' +  year;
  timeOut.natural = natTime;
  timeOut.unix = unixTime;
  return timeOut;
}

//convert natural time into unix, call unix time, convert
function naturalTimeConvert(natTime){
  var natArr = natTime.split("%20");
  console.log(natArr);
  return timeOut;
}