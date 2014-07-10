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
        .when('/results/:query/:category/:order/:ascdesc', {
          controller : ResultsCtrl,
          templateUrl: 'views/results.html'
        })
        .otherwise({ redirectTo: '/' });
    });

function ResultsCtrl ($http, $scope, $routeParams) {

  $scope.category     = category     = $routeParams.category;
  $scope.orderAscDesc = orderAscDesc = $routeParams.ascdesc;
  $scope.orderBy      = orderBy      = $routeParams.order;
  $scope.query        = query        = $routeParams.query;

  if (sessionStorage[query + category + orderBy + orderAscDesc]) {
    $scope.error = false;
    $scope.noResults = false;
    $scope.results = JSON.parse(sessionStorage[query + category + category + orderBy + orderAscDesc]);
  } else {
    $http({
      method: 'GET',
      url   : '/search',
      params: {
        searchQuery : query,
        orderBy     : orderBy,
        orderAscDesc: orderAscDesc,
        category    : category
      }
    }).success(function (data, status, headers, config) {
      if (data == false) {
        $scope.error = false;
        $scope.results = false;
        $scope.noResults = true;
      } else {
        $scope.error = false;
        $scope.noResults = false;
        $scope.results = data;
        sessionStorage[query + category + orderBy + orderAscDesc] = JSON.stringify(data);
      }
    }).error(function (data, status, headers, config) {
      $scope.noResults = false;
      $scope.results = false;
      $scope.error = true;
    });
  }

  $scope.search = function () {
    var query        = $scope.query;
    var orderBy      = $scope.orderBy || 'seeds';
    var orderAscDesc = $scope.orderAscDesc || 'desc';
    var category     = $scope.category || '0'

    window.location  = '#/results/' + query + '/' + category + '/' + orderBy + '/' + orderAscDesc;
  }
};

function SidebarCtrl ($scope) {
  $scope.orderBy      = 'seeds';
  $scope.orderAscDesc = 'desc';
  $scope.category     = '0';
  $scope.search = function () {
    var query        = $scope.query;
    var orderBy      = $scope.orderBy || 'seeds';
    var orderAscDesc = $scope.orderAscDesc || 'desc';
    var category     = $scope.category || '0'

    window.location  = '#/results/' + query + '/' + category + '/' + orderBy + '/' + orderAscDesc;
  }
}