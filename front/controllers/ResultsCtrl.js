function ResultsCtrl ($http, $scope, $routeParams, torrents) {

  $scope.loader = true;

  var category        = $routeParams.category;
  var orderAscDesc    = $routeParams.ascdesc;
  var orderBy         = $routeParams.order;
  var query           = $routeParams.query;
  var page            = $routeParams.page;

  $scope.category     = category;
  $scope.orderAscDesc = orderAscDesc;
  $scope.orderBy      = orderBy;
  $scope.query        = query;

  if (page == 0) {
    $scope.onFirstPage = true;
    $scope.onLastPage  = false;
  } else if (page == 99) {
    $scope.onFirstPage = false;
    $scope.onLastPage  = true;
  } else {
    $scope.onFirstPage = false;
    $scope.onLastPage  = false;
  }

  if (sessionStorage[query + category + orderBy + orderAscDesc + page]) {
    $scope.loader    = false;
    $scope.error     = false;
    $scope.noResults = false;
    $scope.results   = JSON.parse(sessionStorage[query + category + orderBy + orderAscDesc + page]);
  } else {
    torrents.get(query, category, orderBy, orderAscDesc, page).then(function (response) {
      if (response.status == 200) {
        var data = response.data;
        if (data == false) {
          $scope.loader    = false;
          $scope.error     = false;
          $scope.results   = false;
          $scope.notPage   = false;
          $scope.noResults = true;
        } else if (data == 'Page doesn\' exist') {
          $scope.loader    = false;
          $scope.error     = false;
          $scope.results   = false;
          $scope.noResulta = false;
          $scope.notPage   = true;
        } else {
          $scope.loader    = false;
          $scope.error     = false;
          $scope.noResults = false;
          $scope.notPage   = false;
          $scope.results   = data;
          sessionStorage[query + category + orderBy + orderAscDesc + page] = JSON.stringify(data);
        };
      } else {
        $scope.loader    = false;
        $scope.noResults = false;
        $scope.results   = false;
        $scope.notPage   = false;
        $scope.error     = true;
      };
    });
  };

  $scope.search = function () {
    var query        = $scope.query;
    var orderBy      = $scope.orderBy || 'seeds';
    var orderAscDesc = $scope.orderAscDesc || 'desc';
    var category     = $scope.category || '0';
    var page         = 0;

    window.location  = '#/results/' + query + '/' + category + '/' + orderBy + '/' + orderAscDesc + '/' + page;
  };

  $scope.nextPage = function () {
    var query        = $scope.query;
    var orderBy      = $scope.orderBy || 'seeds';
    var orderAscDesc = $scope.orderAscDesc || 'desc';
    var category     = $scope.category || '0';
    page++

    $('html, body').animate({ scrollTop:  $('#results').offset().top - 50 }, 800);

    window.location  = '#/results/' + query + '/' + category + '/' + orderBy + '/' + orderAscDesc + '/' + page;
  };

  $scope.prevPage = function () {
    var query        = $scope.query;
    var orderBy      = $scope.orderBy || 'seeds';
    var orderAscDesc = $scope.orderAscDesc || 'desc';
    var category     = $scope.category || '0';
    page--

    $('html, body').animate({ scrollTop:  $('#results').offset().top - 50 }, 800);

    window.location  = '#/results/' + query + '/' + category + '/' + orderBy + '/' + orderAscDesc + '/' + page;
  };

  $scope.firstPage = function () {
    var query        = $scope.query;
    var orderBy      = $scope.orderBy || 'seeds';
    var orderAscDesc = $scope.orderAscDesc || 'desc';
    var category     = $scope.category || '0';
    var page         = 0;

    $('html, body').animate({ scrollTop:  $('#results').offset().top - 50 }, 800);

    window.location  = '#/results/' + query + '/' + category + '/' + orderBy + '/' + orderAscDesc + '/' + page;
  };

  $scope.goTop = function () {
    $('html, body').animate({ scrollTop:  $('#results').offset().top - 50 }, 800);
  };

  $scope.moreResults = function () {
    page--


  }
};
