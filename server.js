var express = require('express');
var logfmt  = require('logfmt');
var tpb     = require('thepiratebay');
var app     = express();

app.use(logfmt.requestLogger());

app.use(express.static(__dirname + '/front'));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/front/index.html');
});

app.get('/search', function (req, res) {
  var query = req.query.query;

  tpb.search(query, {
    category: 'all',
    page    : 0,
    orderBy : 'seeds desc'
  }, function (err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log(res);
    }
  })
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log('Listening on ' + port);
});
