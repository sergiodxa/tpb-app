/**
* TPBApp Module
*
* WebApp in NodeJS to search torrents in The Pirate Bay
*/
angular.module('TPBApp', ['ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        controller : HomeCtrl,
        templateUrl: 'views/home.html'
      })
      .otherwise({ redirectTo: '/' });
  });

function HomeCtrl ($http, $scope) {
  $scope.search = function () {
    $http({
      method: 'GET',
      url   : '/search',
      params: {
        searchQuery : $scope.query
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

        $('html, body').animate({ scrollTop:  $('#results').offset().top - 50 }, 800);
      }
    }).error(function (data, status, headers, config) {
      $scope.noResults = false;
      $scope.results = false;
      $scope.error = true;
    });
  };
};