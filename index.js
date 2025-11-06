// index.js
// Request Header Parser Microservice

require('dotenv').config();
var express = require('express');
var cors = require('cors');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
app.use(cors({ optionsSuccessStatus: 200 }));

// serve static files
app.use(express.static('public'));

// root route
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// ✅ MAIN PROJECT ROUTE
app.get('/api/whoami', function (req, res) {
  // IP address: first check x-forwarded-for (when behind a proxy), fall back to req.ip
  var ip = req.headers['x-forwarded-for'] || req.ip;
  if (ip && ip.indexOf(',') !== -1) {
    ip = ip.split(',')[0]; // take first IP if list
  }

  var language = req.headers['accept-language'];
  var software = req.headers['user-agent'];

  res.json({
    ipaddress: ip,
    language: language,
    software: software
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

