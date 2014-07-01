var express = require('express');
var logfmt  = require('logfmt');
var tpb     = require('thepiratebay');
var app     = express();

//app.use(logfmt.requestLogger());

app.use(express.static(__dirname + '/front'));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/front/index.html');
});

app.get('/search', function (req, res) {
  var searchQuery = req.query.searchQuery;

  tpb.search(searchQuery, {
      category: 'all',
      orderBy : 'seeds desc'
  }).then(function (results){
      console.log(results);
      res.send(results);
  }).catch(function (err){
      res.send(false);
  });

});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log('Listening on ' + port);
});
