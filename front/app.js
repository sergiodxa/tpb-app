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
        .when('/recents', {
          controller : RecentsCtrl,
          templateUrl: 'views/results.html'
        })
        .otherwise({ redirectTo: '/' });
    });
