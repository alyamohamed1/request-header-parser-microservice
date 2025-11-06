// index.js
// Request Header Parser Microservice

require('dotenv').config();
var express = require('express');
var cors = require('cors');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// ✅ Main project endpoint
app.get('/api/whoami', function (req, res) {
  // IP address
  var ipaddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.connection.remoteAddress;
  if (ipaddress && ipaddress.indexOf(',') !== -1) {
    ipaddress = ipaddress.split(',')[0]; // take first IP if multiple
  }

  // Preferred language
  var language = req.headers['accept-language'];

  // Software (user agent)
  var software = req.headers['user-agent'];

  res.json({
    ipaddress: ipaddress,
    language: language,
    software: software,
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
