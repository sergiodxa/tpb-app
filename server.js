var express = require('express');
var tpb     = require('thepiratebay');
var app     = express();

app.use(express.static(__dirname + '/front'));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/front/index.html');
});

app.get('/search', function (req, res) {
  // get the search query from the URL
  var searchQuery = req.query.searchQuery;

  // call method search of tpb with the params searchQuery, all categories, order descendant by seeds and if the query is successful send the results to the response, else send false.
  tpb.search(searchQuery, {
      category: 'all',
      orderBy : 'seeds desc'
  }).then(function (results){
      res.send(results);
  }).catch(function (err){
      res.send(false);
  });

});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log('Listening on ' + port);
});
