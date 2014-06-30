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
    console.log('ok');
    $http({
      method: 'GET',
      url   : '/search',
      params: {
        query : $scope.query
      }
    }).success(function (data) {
      console.log(data);
    }).error(function (data) {
      console.log(data);
    });
  };
};
