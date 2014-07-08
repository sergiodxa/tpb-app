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
        .when('/results/:query/:order/:ascdesc', {
          controller : ResultsCtrl,
          templateUrl: 'views/results.html'
        })
        .otherwise({ redirectTo: '/' });
    });

function ResultsCtrl ($http, $scope, $routeParams) {

  var query        = $routeParams.query;
  var orderBy      = $routeParams.order;
  var orderAscDesc = $routeParams.ascdesc;

  if (sessionStorage[query + orderBy + orderAscDesc]) {
    $scope.error = false;
    $scope.noResults = false;
    $scope.results = JSON.parse(sessionStorage[query + orderBy + orderAscDesc]);
  } else {
    $http({
      method: 'GET',
      url   : '/search',
      params: {
        searchQuery : query,
        orderBy     : orderBy,
        orderAscDesc: orderAscDesc
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
        sessionStorage[query + orderBy + orderAscDesc] = JSON.stringify(data);
      }
    }).error(function (data, status, headers, config) {
      $scope.noResults = false;
      $scope.results = false;
      $scope.error = true;
    });
  }
};

function SidebarCtrl ($scope) {
  $scope.orderBy      = 'seeds';
  $scope.orderAscDesc = 'desc';
  $scope.search = function () {
    var query        = $scope.query;
    var orderBy      = $scope.orderBy;
    var orderAscDesc = $scope.orderAscDesc;

    window.location  = '#/results/' + query + '/' + orderBy + '/' + orderAscDesc;
  }
}