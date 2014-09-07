/**
* TPBApp Module
*
* WebApp in NodeJS to search torrents in The Pirate Bay
*/
angular.module('TPBApp', ['ngRoute'])
  .config(function ($routeProvider, $compileProvider) {

      $compileProvider.aHrefSanitizationWhitelist(/^\s*(magnet|file):|torrent|tv/);

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
        .when('/tv', {
          controller : TVCtrl,
          templateUrl: 'views/tv.html'
        })
        .when('/tv/:id', {
          controller : SerieCtrl,
          templateUrl: 'views/serie.html'
        })
        .when('/torrent/:id', {
          controller : TorrentCtrl,
          templateUrl: 'views/torrent.html'
        })
        .otherwise({ redirectTo: '/' });
    });
