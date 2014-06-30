/**
* TPBApp Module
*
* WebApp in NodeJS to search torrents in The Pirate Bay
*/
angular.module('TPBApp', ['ngRoute']).config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html'
    })
    .otherwise({ redirectTo: '/' });
})