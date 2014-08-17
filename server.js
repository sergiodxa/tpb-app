var express    = require('express');
var tpb        = require('thepiratebay');
var getOrderBy = require('./orderby');
var app        = express();

app.use(express.static(__dirname + '/front'));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/front/index.html');
});

app.get('/search', function (req, res) {
  // get the search query from the URL
  var searchQuery       = req.query.searchQuery;
  var orderByQuery      = req.query.orderBy;
  var orderAscDescQuery = req.query.orderAscDesc;
  var categoryQuery     = req.query.category;
  var pageQuery         = req.query.page;

  if (pageQuery < 0 || pageQuery > 99) {
    res.send('Page doesn\' exist');
  }

  var orderBy = getOrderBy(orderByQuery, orderAscDescQuery);

  // call method search of tpb with the params searchQuery, all categories, order descendant by seeds and if the query is successful send the results to the response, else send false.
  tpb.search(searchQuery, {
    category: categoryQuery,
    orderBy : orderBy,
    page    : pageQuery
  }).then(function (results){
      res.send(results);
  }).catch(function (err){
      res.send(false);
  });

});

app.get('/top', function (req, res) {
  // get the category query from the URL
  var categoryQuery = req.query.category;

  if (categoryQuery == 0) {
    tpb.topTorrents().then(function (results) {
      res.send(results);
    }).catch(function (err) {
      res.send(false);
    });
  } else {
    tpb.topTorrents(categoryQuery).then(function (results) {
      res.send(results);
    }).catch(function (err) {
      res.send(false);
    });
  };

});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log('Listening on ' + port);
});
