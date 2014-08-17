/**
* TPBApp Module
*
* WebApp in NodeJS to search torrents in The Pirate Bay
*/
angular.module('TPBApp', ['ngRoute'])
  .config(function ($routeProvider, $compileProvider) {

      $compileProvider.aHrefSanitizationWhitelist(/^\s*(magnet|file):/);

      $routeProvider
        .when('/', {
          templateUrl: 'views/home.html'
        })
        .when('/results/:query/:category/:order/:ascdesc/:page', {
          controller : ResultsCtrl,
          templateUrl: 'views/results.html'
        })
        .when('/top', {
          templateUrl: 'views/top.html'
        })
        .when('/top/:category', {
          controller : TopCtrl,
          templateUrl: 'views/results.html'
        })
        .otherwise({ redirectTo: '/' });
    });

function ResultsCtrl ($http, $scope, $routeParams) {

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
    $scope.loader = false;
    $scope.error = false;
    $scope.noResults = false;
    $scope.results = JSON.parse(sessionStorage[query + category + orderBy + orderAscDesc + page]);
  } else {
    $http({
      method: 'GET',
      url   : '/search',
      params: {
        searchQuery : query,
        orderBy     : orderBy,
        orderAscDesc: orderAscDesc,
        category    : category,
        page        : page
      }
    }).success(function (data, status, headers, config) {
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
    }).error(function (data, status, headers, config) {
      $scope.loader    = false;
      $scope.noResults = false;
      $scope.results   = false;
      $scope.notPage   = false;
      $scope.error     = true;
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
    var page         = parseInt($routeParams.page);
    page++

    $('html, body').animate({ scrollTop:  $('#results').offset().top - 50 }, 800);

    window.location  = '#/results/' + query + '/' + category + '/' + orderBy + '/' + orderAscDesc + '/' + page;
  };

  $scope.prevPage = function () {
    var query        = $scope.query;
    var orderBy      = $scope.orderBy || 'seeds';
    var orderAscDesc = $scope.orderAscDesc || 'desc';
    var category     = $scope.category || '0';
    var page         = parseInt($routeParams.page);
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
};

function SidebarCtrl ($scope) {
  $scope.orderBy      = 'seeds';
  $scope.orderAscDesc = 'desc';
  $scope.category     = '0';

  $scope.search = function () {
    var query        = $scope.query;
    var orderBy      = $scope.orderBy || 'seeds';
    var orderAscDesc = $scope.orderAscDesc || 'desc';
    var category     = $scope.category || '0';
    var page         = 0;

    window.location  = '#/results/' + query + '/' + category + '/' + orderBy + '/' + orderAscDesc + '/' + page;
  };
};

function TopCtrl ($http, $scope, $routeParams) {

  $scope.loader = true;

  var category  = $routeParams.category;

  if (sessionStorage['top' + category]) {
    $scope.loader    = false;
    $scope.error     = false;
    $scope.noResults = false;
    $scope.results   = JSON.parse(sessionStorage['top' + category]);
  } else {
    $http({
      method: 'GET',
      url   : '/top',
      params: {
        category: category
      }
    }).success(function (data, status, headers, config) {
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
        sessionStorage['top' + category] = JSON.stringify(data);
      };
    }).error(function (data, status, headers, config) {
      $scope.loader    = false;
      $scope.noResults = false;
      $scope.results   = false;
      $scope.notPage   = false;
      $scope.error     = true;
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

  $scope.goTop = function () {
    $('html, body').animate({ scrollTop:  $('#results').offset().top - 50 }, 800);
  };
};